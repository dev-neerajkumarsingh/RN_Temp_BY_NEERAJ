/**
 * Dangerfile.ts
 *
 * Automated MR review for React Native boilerplate compliance.
 * Runs in GitLab CI and posts inline comments / warnings / failures
 * directly on Merge Requests.
 *
 * Checks:
 *  1. MR hygiene        – description, size, WIP status
 *  2. File types         – enforce TypeScript, no new .js files
 *  3. Folder structure   – screens, components, hooks in correct dirs
 *  4. Import discipline  – use @aliases, no raw axios/fetch/AsyncStorage
 *  5. Code patterns      – no console.log, no inline styles, React.memo
 *  6. Barrel exports     – remind to update index.ts when adding modules
 *  7. Sensitive files    – block .env / secret changes
 *  8. File size          – warn if file exceeds 400 lines
 *  9. Naming conventions – kebab-case folders, PascalCase components
 * 10. Optional chaining  – proper ?. usage, no excessive chaining, no misuse
 */

/* eslint-disable max-lines */
// ↑ Dangerfile is a tooling config — 400-line limit applies to app code in src/
import { danger, warn, fail, markdown } from 'danger';

// ─── Helpers ──────────────────────────────────────────────────────────
const modifiedFiles = danger.git.modified_files;
const createdFiles = danger.git.created_files;
const deletedFiles = danger.git.deleted_files;
const allChangedFiles = [...modifiedFiles, ...createdFiles];
const allSourceFiles = allChangedFiles.filter(f =>
  /\.(ts|tsx|js|jsx)$/.test(f),
);

const mrBody = danger.gitlab?.mr?.description ?? '';
const mrTitle = danger.gitlab?.mr?.title ?? '';

// Read diff for each file (returns a promise)
async function diffForFile(path: string) {
  const diff = await danger.git.diffForFile(path);
  return diff?.added ?? '';
}

// ─── 1. MR HYGIENE ───────────────────────────────────────────────────

// Description must be meaningful
if (mrBody.length < 20) {
  fail(
    '**MR Description is too short.** Please describe what this MR does, why, and how to test it. ' +
      'Minimum 20 characters.',
  );
}

// WIP / Draft check
if (mrTitle.startsWith('Draft:') || mrTitle.startsWith('WIP:')) {
  warn('This MR is still marked as **Draft/WIP**. Remove the prefix when ready for review.');
}

// Large MR warning (excluding assets, lockfiles, auto-generated)
const meaningfulFiles = allChangedFiles.filter(
  f =>
    !f.match(/\.(png|jpg|jpeg|gif|webp|svg|ttf|otf|woff|woff2)$/i) &&
    !f.includes('package-lock.json') &&
    !f.includes('Podfile.lock') &&
    !f.includes('Gemfile.lock'),
);

if (meaningfulFiles.length > 30) {
  warn(
    `**Large MR detected** — ${meaningfulFiles.length} meaningful files changed. ` +
      'Consider splitting into smaller, focused MRs for easier review.',
  );
} else if (meaningfulFiles.length > 50) {
  fail(
    `**MR is too large** — ${meaningfulFiles.length} files changed. ` +
      'Please split this MR. Max 50 non-asset files per MR.',
  );
}

// ─── 2. TYPESCRIPT ENFORCEMENT ───────────────────────────────────────

const newJsFiles = createdFiles.filter(f =>
  /src\/.*\.(js|jsx)$/.test(f) &&
  !f.includes('babel.config') &&
  !f.includes('metro.config') &&
  !f.includes('jest.config'),
);

if (newJsFiles.length > 0) {
  fail(
    '**New JavaScript files detected.** All new files must use TypeScript (`.ts` / `.tsx`).\n\n' +
      newJsFiles.map(f => `- \`${f}\``).join('\n'),
  );
}

// ─── 3. FOLDER STRUCTURE ENFORCEMENT ─────────────────────────────────

const srcFiles = createdFiles.filter(f => f.startsWith('src/'));

for (const file of srcFiles) {
  // Screen files must be inside src/screens/
  if (
    (file.includes('Screen') || file.includes('screen')) &&
    !file.startsWith('src/screens/') &&
    !file.startsWith('src/common/')
  ) {
    fail(
      `**Wrong location for screen file:** \`${file}\`\n` +
        'Screen files must live inside `src/screens/app/` or `src/screens/auth/`.',
    );
  }

  // Hook files must be inside src/common/hooks/
  if (
    file.match(/use[A-Z]/) &&
    file.startsWith('src/') &&
    !file.startsWith('src/common/hooks/') &&
    !file.includes('/components/') &&
    !file.includes('/screens/')
  ) {
    warn(
      `**Custom hook outside hooks directory:** \`${file}\`\n` +
        'Shared hooks should live in `src/common/hooks/`. ' +
        'If this hook is only used by one component, ignore this warning.',
    );
  }

  // Reusable components must be inside src/common/components/
  if (
    file.startsWith('src/') &&
    file.match(/Common[A-Z]/) &&
    !file.startsWith('src/common/components/')
  ) {
    fail(
      `**Reusable component in wrong location:** \`${file}\`\n` +
        'Components prefixed with "Common" must live inside `src/common/components/`.',
    );
  }

  // Network/API files must be inside src/network/
  if (
    file.match(/(api|service|endpoint)/i) &&
    file.startsWith('src/') &&
    !file.startsWith('src/network/')
  ) {
    warn(
      `**API/Service file outside network directory:** \`${file}\`\n` +
        'API services and endpoints should live in `src/network/`.',
    );
  }

  // Redux slices must be inside src/redux/
  if (
    file.match(/(slice|reducer|store)/i) &&
    file.startsWith('src/') &&
    !file.startsWith('src/redux/')
  ) {
    warn(
      `**Redux file outside redux directory:** \`${file}\`\n` +
        'Redux slices, reducers, and store config should live in `src/redux/`.',
    );
  }
}

// ─── 4. IMPORT DISCIPLINE ────────────────────────────────────────────

(async () => {
  for (const file of allSourceFiles) {
    const added = await diffForFile(file);
    if (!added) continue;

    // Block raw axios imports — must use NetworkManager
    if (added.match(/import\s+.*from\s+['"]axios['"]/)) {
      fail(
        `**Direct \`axios\` import in \`${file}\`.**\n` +
          'Use the `NetworkManager` from `@network` instead of importing axios directly. ' +
          'It handles encryption, auth tokens, and error handling automatically.',
      );
    }

    // Block raw fetch calls
    if (added.match(/\bfetch\s*\(/)) {
      warn(
        `**Raw \`fetch()\` call in \`${file}\`.**\n` +
          'Use the `NetworkManager` from `@network` instead. ' +
          'It handles encryption, auth tokens, and error states.',
      );
    }

    // Block direct AsyncStorage imports — must use redux-persist/keychain
    if (added.match(/import\s+.*from\s+['"]@react-native-async-storage\/async-storage['"]/)) {
      fail(
        `**Direct AsyncStorage import in \`${file}\`.**\n` +
          'Use Redux Persist with Keychain storage (already configured in the boilerplate) ' +
          'instead of accessing AsyncStorage directly. This ensures data is encrypted.',
      );
    }

    // Enforce path aliases — warn on deep relative imports
    const deepRelativeImports = added.match(/from\s+['"](\.\.\/\.\.\/\.\.\/).*/g);
    if (deepRelativeImports) {
      warn(
        `**Deep relative imports in \`${file}\`.**\n` +
          'Use path aliases (`@components`, `@hooks`, `@network`, `@redux`, `@themes`, `@utils`, `@screens`, `@icons`, `@fonts`) ' +
          'instead of relative paths with 3+ levels.\n\n' +
          deepRelativeImports.map(i => `- \`${i}\``).join('\n'),
      );
    }

    // Warn on console.log left in code
    const consoleMatches = added.match(/console\.(log|debug|info|warn|error)\(/g);
    if (consoleMatches && !file.includes('__tests__') && !file.includes('.test.')) {
      warn(
        `**\`console.log\` found in \`${file}\`** (${consoleMatches.length} occurrence${consoleMatches.length > 1 ? 's' : ''}).\n` +
          'Remove console statements before merging. Use the Toast system or proper error handling instead.',
      );
    }

    // Warn on inline styles (backup check for ESLint)
    if (added.match(/style\s*=\s*\{\s*\{/)) {
      warn(
        `**Inline styles detected in \`${file}\`.**\n` +
          'Use `StyleSheet.create()` for all styles. Inline styles hurt performance ' +
          'because they create new objects on every render.',
      );
    }

    // Check for hardcoded colors (should use theme)
    const hardcodedColors = added.match(/(color|backgroundColor|borderColor)\s*:\s*['"]#[0-9a-fA-F]{3,8}['"]/g);
    if (hardcodedColors && !file.includes('themes/')) {
      warn(
        `**Hardcoded colors in \`${file}\`.**\n` +
          'Use theme colors from `@themes` instead of hardcoded hex values. ' +
          'This ensures dark/light mode support.\n\n' +
          hardcodedColors.slice(0, 5).map(c => `- \`${c}\``).join('\n'),
      );
    }

    // Check for hardcoded strings (potential i18n issue)
    // Only check for JSX text content, not imports or keys
    if (file.endsWith('.tsx') && file.includes('screens/')) {
      const hardcodedStrings = added.match(/>\s*['"][A-Z][a-zA-Z\s]{10,}['"]\s*</g);
      if (hardcodedStrings && hardcodedStrings.length > 3) {
        warn(
          `**Multiple hardcoded strings in \`${file}\`.**\n` +
            'Consider using the language/i18n system from `@redux` for user-facing text ' +
            'to support multi-language in the future.',
        );
      }
    }

    // ─── OPTIONAL CHAINING CHECKS ──────────────────────────────────

    // 1. Excessive optional chaining depth (a?.b?.c?.d?.e — 4+ levels = code smell)
    const deepChaining = added.match(/\w+(\?\.\w+){4,}/g);
    if (deepChaining) {
      warn(
        `**Excessive optional chaining depth in \`${file}\`.**\n` +
          'Chaining 4+ levels deep (e.g., `a?.b?.c?.d?.e`) is a code smell — it usually means:\n' +
          '- The data structure is too deeply nested. Flatten it.\n' +
          '- You\'re guessing where nulls can occur instead of knowing your types.\n' +
          '- An early return or guard clause would be cleaner.\n\n' +
          deepChaining.slice(0, 3).map(c => `- \`${c}\``).join('\n'),
      );
    }

    // 2. Optional chaining on values that should never be null (Redux hooks, known non-null)
    const suspiciousChaining = [
      // dispatch should never be null — it's from useAppDispatch()
      ...(added.match(/dispatch\?\./g) || []),
      // navigation from useNav hook is always defined
      ...(added.match(/navigation\?\./g) || []),
      // theme is always provided by ThemeContext
      ...(added.match(/theme\?\./g) || []),
      // StyleSheet.create result is never null
      ...(added.match(/styles\?\./g) || []),
    ];
    if (suspiciousChaining.length > 0) {
      warn(
        `**Unnecessary optional chaining on non-nullable values in \`${file}\`.**\n` +
          `Found ${suspiciousChaining.length} instance(s) of \`?.\` on values that are guaranteed to exist ` +
          '(e.g., `dispatch`, `navigation`, `theme`, `styles`).\n' +
          'These come from hooks/contexts that always return a value. ' +
          'Using `?.` here hides potential setup bugs and makes the code misleading.\n' +
          'Remove the `?` and use direct property access instead.',
      );
    }

    // 3. Missing optional chaining — accessing API response data without ?. guard
    // Check for patterns like `response.data.something` without ?.
    // (common crash source when API returns unexpected shape)
    const unsafeResponseAccess = added.match(/(?:response|result|res|data)\.data\.[a-zA-Z]/g);
    const safeResponseAccess = added.match(/(?:response|result|res|data)(?:\?\.data|\.\s*data\?\.)[a-zA-Z]/g);
    if (unsafeResponseAccess && unsafeResponseAccess.length > 0) {
      const safeCount = safeResponseAccess?.length ?? 0;
      const unsafeCount = unsafeResponseAccess.length;
      if (unsafeCount > safeCount) {
        warn(
          `**API response accessed without optional chaining in \`${file}\`.**\n` +
            'Accessing `response.data.xyz` without `?.` is risky — if the API returns an ' +
            'unexpected shape, this will crash at runtime.\n' +
            'Use `response?.data?.xyz` or validate the response shape with a type guard first.\n\n' +
            unsafeResponseAccess.slice(0, 3).map(a => `- \`${a}\``).join('\n'),
        );
      }
    }

    // 4. Optional chaining with non-null assertion — contradictory pattern
    // e.g., `obj?.prop!` or `arr?.length!` — using ?. then ! defeats the purpose
    const chainingWithBang = added.match(/\?\.\w+\s*!/g);
    if (chainingWithBang) {
      fail(
        `**Contradictory \`?.\` with \`!\` (non-null assertion) in \`${file}\`.**\n` +
          'Using optional chaining `?.` followed by `!` is contradictory — you\'re saying ' +
          '"this might be null" and "this is definitely not null" in the same expression.\n' +
          'Pick one: either the value can be null (use `?.` with proper fallback) or it can\'t (use `.` directly).\n\n' +
          chainingWithBang.slice(0, 3).map(c => `- \`${c}\``).join('\n'),
      );
    }

    // 5. Optional chaining in useCallback/useMemo dependency arrays
    // e.g., [obj?.value] in deps — this will cause infinite re-renders if obj is null
    const depsWithChaining = added.match(/\[[\s\S]*?\w+\?\.\w+[\s\S]*?\]\s*\)/g);
    if (depsWithChaining) {
      warn(
        `**Optional chaining inside dependency arrays in \`${file}\`.**\n` +
          'Using `?.` in `useCallback`/`useMemo`/`useEffect` dependency arrays (e.g., `[obj?.value]`) ' +
          'can cause unexpected re-renders when `obj` is `undefined` — the dep evaluates to `undefined` ' +
          'every time, which React sees as "changed".\n' +
          'Extract the value to a variable first: `const val = obj?.value;` then use `[val]` in deps.',
      );
    }

    // 6. Nullish coalescing (??) without optional chaining where needed
    // e.g., `obj.prop ?? default` when obj itself could be null
    const nullishWithoutChaining = added.match(/\w+\.(?:data|value|result|response|user|item|params)\s+\?\?/g);
    if (nullishWithoutChaining && file.includes('screens/')) {
      warn(
        `**Nullish coalescing (\`??\`) without optional chaining in \`${file}\`.**\n` +
          'Using `obj.prop ?? default` only guards against `prop` being null/undefined, ' +
          'but if `obj` itself is null, this will still crash.\n' +
          'Use `obj?.prop ?? default` to guard the entire chain.\n\n' +
          nullishWithoutChaining.slice(0, 3).map(n => `- \`${n}\``).join('\n'),
      );
    }

    // 7. Optional chaining on function calls without checking return
    // e.g., `arr?.find(...)` used directly in JSX without fallback
    const chainingCallInJsx = added.match(/<[^>]*\{[^}]*\w+\?\.\w+\([^)]*\)\s*\}[^>]*/g);
    if (chainingCallInJsx && file.endsWith('.tsx')) {
      warn(
        `**Optional chaining method call used directly in JSX in \`${file}\`.**\n` +
          'Calling `arr?.find(...)` or `obj?.method()` directly in JSX can render `undefined` ' +
          'if the left side is null. Provide a fallback with `?? \'\'` or `?? null`, ' +
          'or extract to a variable with a proper null check.',
      );
    }
  }
})();

// ─── 5. BARREL EXPORT REMINDERS ──────────────────────────────────────

// Check if new components were added but barrel index wasn't updated
const newComponentFiles = createdFiles.filter(f =>
  f.startsWith('src/common/components/') && f.match(/\.(ts|tsx)$/) && !f.endsWith('index.ts'),
);
const componentsIndexModified = modifiedFiles.includes('src/common/components/index.ts');

if (newComponentFiles.length > 0 && !componentsIndexModified) {
  warn(
    '**New component files added but `src/common/components/index.ts` was not updated.**\n' +
      'Remember to export your new component from the barrel file so it can be imported via `@components`.\n\n' +
      newComponentFiles.map(f => `- \`${f}\``).join('\n'),
  );
}

// Same check for screens
const newScreenFiles = createdFiles.filter(f =>
  f.startsWith('src/screens/') && f.match(/\.(ts|tsx)$/) && !f.endsWith('index.ts'),
);
const screensIndexModified = modifiedFiles.includes('src/screens/index.ts');

if (newScreenFiles.length > 0 && !screensIndexModified) {
  warn(
    '**New screen files added but `src/screens/index.ts` was not updated.**\n' +
      'Remember to export your new screen from the barrel file.\n\n' +
      newScreenFiles.map(f => `- \`${f}\``).join('\n'),
  );
}

// Same check for hooks
const newHookFiles = createdFiles.filter(f =>
  f.startsWith('src/common/hooks/') && f.match(/\.(ts|tsx)$/),
);
const hooksIndexModified = modifiedFiles.includes('src/common/hooks/index.ts');

if (newHookFiles.length > 0 && !hooksIndexModified) {
  warn(
    '**New hook files added but `src/common/hooks/index.ts` was not updated.**\n' +
      'Remember to export your new hook from the barrel file so it can be imported via `@hooks`.',
  );
}

// Same check for redux slices
const newReduxFiles = createdFiles.filter(f =>
  f.startsWith('src/redux/') && f.match(/\.(ts|tsx)$/),
);
const reduxIndexModified = modifiedFiles.includes('src/redux/index.ts');

if (newReduxFiles.length > 0 && !reduxIndexModified) {
  warn(
    '**New redux files added but `src/redux/index.ts` was not updated.**\n' +
      'Remember to export new slices/hooks from the barrel file.',
  );
}

// ─── 6. SENSITIVE FILE PROTECTION ────────────────────────────────────

const envFiles = allChangedFiles.filter(f => f.match(/\.env/));
if (envFiles.length > 0) {
  fail(
    '**Environment files modified!**\n' +
      'Changes to `.env` files should not go through feature MRs. ' +
      'Environment changes need separate review and deployment coordination.\n\n' +
      envFiles.map(f => `- \`${f}\``).join('\n'),
  );
}

const sensitivePatterns = [
  /secret/i,
  /credential/i,
  /password/i,
  /api.?key/i,
  /private.?key/i,
  /token/i,
];

for (const file of createdFiles) {
  const fileName = file.split('/').pop() ?? '';
  if (sensitivePatterns.some(p => p.test(fileName))) {
    warn(
      `**Potentially sensitive file name:** \`${file}\`\n` +
        'Make sure this file does not contain secrets. Secrets should be in `.env` files (which are gitignored).',
    );
  }
}

// ─── 7. FILE SIZE CHECK ──────────────────────────────────────────────

(async () => {
  for (const file of allSourceFiles) {
    // Only check source files, not generated or config
    if (!file.startsWith('src/')) continue;

    const diff = await danger.git.diffForFile(file);
    if (!diff) continue;

    // Count total lines after changes (rough estimate from diff)
    const addedLines = (diff.added.match(/\n/g) || []).length;
    const removedLines = (diff.removed.match(/\n/g) || []).length;
    const netAdded = addedLines - removedLines;

    // If adding more than 400 net lines in a single file, it's likely too big
    if (netAdded > 400) {
      warn(
        `**\`${file}\` is growing very large** (+${netAdded} lines).\n` +
          'Files should stay under 400 lines (per ESLint config). Consider splitting into smaller modules.',
      );
    }
  }
})();

// ─── 8. NAMING CONVENTIONS ───────────────────────────────────────────

for (const file of createdFiles) {
  if (!file.startsWith('src/')) continue;

  const parts = file.split('/');
  const fileName = parts[parts.length - 1];
  const parentDir = parts[parts.length - 2];

  // Component directories should be kebab-case
  if (file.startsWith('src/common/components/') && parentDir) {
    if (parentDir !== 'components' && parentDir.match(/[A-Z]/)) {
      warn(
        `**Folder name \`${parentDir}\` uses PascalCase.**\n` +
          'Component directories should use kebab-case (e.g., `common-button`, `common-input`). ' +
          `Rename to \`${parentDir.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}\`.`,
      );
    }
  }

  // Component files should be PascalCase
  if (
    file.startsWith('src/common/components/') &&
    fileName.match(/\.(tsx?)$/) &&
    fileName !== 'index.ts' &&
    fileName !== 'index.tsx' &&
    fileName !== 'styles.ts' &&
    fileName !== 'types.ts'
  ) {
    const nameWithoutExt = fileName.replace(/\.(tsx?)$/, '');
    if (nameWithoutExt[0] !== nameWithoutExt[0].toUpperCase()) {
      warn(
        `**Component file \`${fileName}\` should use PascalCase.**\n` +
          `Rename to \`${nameWithoutExt[0].toUpperCase() + nameWithoutExt.slice(1)}${fileName.match(/\.(tsx?)$/)?.[0]}\`.`,
      );
    }
  }
}

// ─── 9. TEST FILE REMINDER ───────────────────────────────────────────

const newScreenOrComponentFiles = createdFiles.filter(
  f =>
    (f.startsWith('src/screens/') || f.startsWith('src/common/components/')) &&
    f.match(/\.(tsx)$/) &&
    !f.endsWith('index.tsx') &&
    !f.includes('styles'),
);

const newTestFiles = createdFiles.filter(f => f.includes('__tests__') || f.includes('.test.'));

if (newScreenOrComponentFiles.length > 0 && newTestFiles.length === 0) {
  warn(
    '**New screens/components added without tests.**\n' +
      'Consider adding unit tests in `__tests__/` for new components and screens.\n\n' +
      newScreenOrComponentFiles.map(f => `- \`${f}\``).join('\n'),
  );
}

// ─── 10. LOCK FILE CHECK ─────────────────────────────────────────────

const packageChanged = allChangedFiles.includes('package.json');
const lockfileChanged = allChangedFiles.includes('package-lock.json');

if (packageChanged && !lockfileChanged) {
  warn(
    '**`package.json` was modified but `package-lock.json` was not.**\n' +
      'Did you forget to run `npm install`? The lockfile should be committed with dependency changes.',
  );
}

if (!packageChanged && lockfileChanged) {
  warn(
    '**`package-lock.json` changed without `package.json` modifications.**\n' +
      'This could indicate inconsistent dependency resolution. Verify the lockfile changes are intentional.',
  );
}

// ─── 11. PLATFORM-SPECIFIC FILE WARNINGS ─────────────────────────────

const androidFiles = allChangedFiles.filter(f => f.startsWith('android/'));
const iosFiles = allChangedFiles.filter(f => f.startsWith('ios/'));

if (androidFiles.length > 0 || iosFiles.length > 0) {
  warn(
    '**Native platform files modified.**\n' +
      'Changes to `android/` or `ios/` directories require extra scrutiny. ' +
      'Make sure native changes are tested on both platforms before merging.\n\n' +
      [...androidFiles, ...iosFiles].slice(0, 10).map(f => `- \`${f}\``).join('\n'),
  );
}

// ─── SUMMARY ─────────────────────────────────────────────────────────

const totalFiles = allChangedFiles.length;
const additions = createdFiles.length;
const deletions = deletedFiles.length;
const modifications = modifiedFiles.length;

markdown(`
### MR Stats
| Metric | Count |
|--------|-------|
| Files Changed | ${totalFiles} |
| New Files | ${additions} |
| Modified Files | ${modifications} |
| Deleted Files | ${deletions} |
`);
