#!/usr/bin/env node

/**
 * ai-review.mjs
 *
 * AI-powered MR reviewer using Claude API.
 * Runs as a GitLab CI job — reads the MR diff, sends it to Claude
 * along with boilerplate review rules, and posts the review
 * as a comment on the Merge Request.
 *
 * Required CI/CD Variables (set in GitLab > Settings > CI/CD > Variables):
 *   - ANTHROPIC_API_KEY  : Your Claude API key
 *   - GITLAB_TOKEN       : GitLab personal access token (with api scope)
 *
 * Provided by GitLab CI automatically:
 *   - CI_MERGE_REQUEST_IID
 *   - CI_PROJECT_ID
 *   - CI_API_V4_URL
 *   - CI_MERGE_REQUEST_DIFF_BASE_SHA
 *   - CI_COMMIT_SHA
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Configuration ───────────────────────────────────────────────────

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
const CI_PROJECT_ID = process.env.CI_PROJECT_ID;
const CI_MERGE_REQUEST_IID = process.env.CI_MERGE_REQUEST_IID;
const CI_API_V4_URL = process.env.CI_API_V4_URL || 'https://gitlab.com/api/v4';
const DIFF_BASE_SHA = process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA;
const COMMIT_SHA = process.env.CI_COMMIT_SHA;

const CLAUDE_MODEL = 'claude-sonnet-4-5-20250929';
const MAX_DIFF_CHARS = 90000; // Stay within context limits

// ─── Validation ──────────────────────────────────────────────────────

function validateEnv() {
  const missing = [];
  if (!ANTHROPIC_API_KEY) missing.push('ANTHROPIC_API_KEY');
  if (!GITLAB_TOKEN) missing.push('GITLAB_TOKEN');
  if (!CI_PROJECT_ID) missing.push('CI_PROJECT_ID');
  if (!CI_MERGE_REQUEST_IID) missing.push('CI_MERGE_REQUEST_IID');

  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('Set these in GitLab > Settings > CI/CD > Variables');
    process.exit(1);
  }
}

// ─── GitLab API Helpers ──────────────────────────────────────────────

async function gitlabAPI(endpoint, options = {}) {
  const url = `${CI_API_V4_URL}/projects/${CI_PROJECT_ID}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'PRIVATE-TOKEN': GITLAB_TOKEN,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitLab API error (${response.status}): ${body}`);
  }

  return response.json();
}

async function getMRChanges() {
  return gitlabAPI(`/merge_requests/${CI_MERGE_REQUEST_IID}/changes`);
}

async function getMRInfo() {
  return gitlabAPI(`/merge_requests/${CI_MERGE_REQUEST_IID}`);
}

async function postMRComment(body) {
  return gitlabAPI(`/merge_requests/${CI_MERGE_REQUEST_IID}/notes`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
}

async function getPreviousAIComments() {
  const notes = await gitlabAPI(
    `/merge_requests/${CI_MERGE_REQUEST_IID}/notes?per_page=100`,
  );
  // Find comments from our bot (identified by the marker)
  return notes.filter(
    (n) => n.body && n.body.includes('<!-- ai-review-bot -->'),
  );
}

async function deleteComment(noteId) {
  const url = `${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}/notes/${noteId}`;
  await fetch(url, {
    method: 'DELETE',
    headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN },
  });
}

// ─── Diff Processing ─────────────────────────────────────────────────

function processMRChanges(mrData) {
  const changes = mrData.changes || [];

  // Filter to only source code files
  const sourceChanges = changes.filter((change) => {
    const path = change.new_path || change.old_path;
    return (
      path.match(/\.(ts|tsx|js|jsx)$/) &&
      !path.includes('node_modules') &&
      !path.includes('package-lock.json') &&
      !path.includes('.lock')
    );
  });

  let diffText = '';
  for (const change of sourceChanges) {
    const header = `\n${'='.repeat(60)}\nFile: ${change.new_path}${change.new_file ? ' (NEW)' : ''}${change.deleted_file ? ' (DELETED)' : ''}${change.renamed_file ? ` (RENAMED from ${change.old_path})` : ''}\n${'='.repeat(60)}\n`;

    diffText += header + (change.diff || '(binary or empty)') + '\n';

    // Truncate if we're getting too large
    if (diffText.length > MAX_DIFF_CHARS) {
      diffText =
        diffText.substring(0, MAX_DIFF_CHARS) +
        '\n\n... [DIFF TRUNCATED — too large for review. Only first portion reviewed.]\n';
      break;
    }
  }

  return {
    diffText,
    fileCount: sourceChanges.length,
    totalFiles: changes.length,
  };
}

// ─── Claude API ──────────────────────────────────────────────────────

async function callClaude(systemPrompt, userMessage) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Claude API error (${response.status}): ${body}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  validateEnv();

  console.log('🤖 AI Review Bot starting...');
  console.log(`   Project: ${CI_PROJECT_ID}`);
  console.log(`   MR: !${CI_MERGE_REQUEST_IID}`);

  // 1. Fetch MR data
  console.log('\n📥 Fetching MR changes...');
  const [mrData, mrInfo] = await Promise.all([getMRChanges(), getMRInfo()]);

  const mrTitle = mrInfo.title;
  const mrDescription = mrInfo.description || '(no description)';
  const sourceBranch = mrInfo.source_branch;
  const targetBranch = mrInfo.target_branch;

  // 2. Process diff
  const { diffText, fileCount, totalFiles } = processMRChanges(mrData);

  if (fileCount === 0) {
    console.log('ℹ️  No source code changes to review. Skipping.');
    process.exit(0);
  }

  console.log(
    `   Found ${fileCount} source files changed (${totalFiles} total files)`,
  );

  // 3. Load review rules
  const reviewRules = readFileSync(
    resolve(__dirname, 'review-rules.md'),
    'utf8',
  );

  // 4. Build prompts
  const systemPrompt = `${reviewRules}

IMPORTANT RULES:
- You are reviewing a React Native project built from a specific boilerplate.
- Focus ONLY on the ADDED lines (lines starting with +) in the diff. Ignore removed lines.
- Be constructive, not harsh. The goal is to help developers improve.
- If code is clean and follows guidelines, keep the review short and positive.
- Do NOT suggest changes to code that isn't part of this diff.
- Flag BLOCKER issues for things that will cause bugs, security issues, or major architecture violations.
- Flag WARNING issues for style/pattern violations that should be fixed.
- Flag SUGGESTION for improvements that are nice-to-have.
- Keep your response under 2000 words. Be concise.`;

  const userMessage = `Review this Merge Request:

**Title:** ${mrTitle}
**Branch:** ${sourceBranch} → ${targetBranch}
**Description:** ${mrDescription}

---

## Diff (${fileCount} source files):

${diffText}`;

  // 5. Call Claude
  console.log('\n🧠 Sending to Claude for review...');
  const review = await callClaude(systemPrompt, userMessage);
  console.log('✅ Review received.');

  // 6. Clean up previous AI review comments
  console.log('\n🧹 Cleaning up previous AI review comments...');
  const previousComments = await getPreviousAIComments();
  for (const comment of previousComments) {
    await deleteComment(comment.id);
  }
  console.log(`   Removed ${previousComments.length} old comment(s).`);

  // 7. Post review comment
  const commentBody = `<!-- ai-review-bot -->
## 🤖 AI Code Review

${review}

---
<sub>Automated review by Claude AI · Model: \`${CLAUDE_MODEL}\` · ${fileCount} files analyzed</sub>`;

  console.log('\n💬 Posting review comment on MR...');
  await postMRComment(commentBody);
  console.log('✅ Review posted successfully!');

  // 8. Check for blockers — if any BLOCKER found, exit with error to fail the pipeline
  const hasBlockers = review.includes('**BLOCKER**') || review.match(/Severity:\s*BLOCKER/i);
  if (hasBlockers) {
    console.log('\n❌ BLOCKER issues found — failing pipeline.');
    process.exit(1);
  }

  console.log('\n✅ AI review complete. No blockers found.');
}

main().catch((err) => {
  console.error('❌ AI Review failed:', err.message);
  // Don't fail the pipeline if the AI review itself errors out
  // (API down, rate limit, etc.) — just warn
  console.warn('⚠️  AI review could not complete. Pipeline will continue.');
  process.exit(0);
});
