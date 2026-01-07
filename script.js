#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\n---------------------------------------------------------');
console.log('🚀 Neeraj Template: Finalizing Native Configuration');
console.log('---------------------------------------------------------\n');

// 1. Get the Project Name (e.g., "DummyApp")
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const projectName = packageJson.name;

// Helper function to recursively copy directory
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper function to recursively remove directory
function rmDirSync(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        rmDirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

// Helper function to find existing Java/Kotlin source directory
function findExistingSourceDir(javaBaseDir) {
  if (!fs.existsSync(javaBaseDir)) return null;

  // Recursively find directory containing MainActivity.kt or MainApplication.kt
  function searchDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const result = searchDir(fullPath);
        if (result) return result;
      } else if (entry.name === 'MainActivity.kt' || entry.name === 'MainApplication.kt') {
        return dir;
      }
    }
    return null;
  }

  return searchDir(javaBaseDir);
}

// Helper function to get current namespace from build.gradle
function getCurrentNamespace(buildGradlePath) {
  if (!fs.existsSync(buildGradlePath)) return null;
  const content = fs.readFileSync(buildGradlePath, 'utf8');
  const match = content.match(/namespace\s+["']([^"']+)["']/);
  return match ? match[1] : null;
}

// Helper function to get package declaration from Kotlin file
function getPackageFromKotlinFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^package\s+(\S+)/m);
  return match ? match[1] : null;
}

// Pre-check for mismatch before asking user
const javaBaseDir = path.join(process.cwd(), 'android', 'app', 'src', 'main', 'java');
const buildGradlePath = path.join(process.cwd(), 'android', 'app', 'build.gradle');

const currentNamespace = getCurrentNamespace(buildGradlePath);
const existingSourceDir = findExistingSourceDir(javaBaseDir);

let currentPackageFromFile = null;
if (existingSourceDir) {
  const mainAppPath = path.join(existingSourceDir, 'MainApplication.kt');
  currentPackageFromFile = getPackageFromKotlinFile(mainAppPath);
}

// Detect mismatch between namespace and file location
const dirPackage = existingSourceDir ?
  path.relative(javaBaseDir, existingSourceDir).replace(/\//g, '.').replace(/\\/g, '.') : null;
const hasMismatch = currentNamespace && dirPackage && currentNamespace !== dirPackage;

// If there's a mismatch, auto-fix it immediately without asking
if (hasMismatch) {
  console.log(`\n⚠️  Detected namespace/directory mismatch!`);
  console.log(`   - Namespace in build.gradle: "${currentNamespace}"`);
  console.log(`   - Directory structure: "${dirPackage}"`);
  console.log(`   Auto-fixing directory structure to match namespace...\n`);

  applyBundleId(currentNamespace, existingSourceDir);
  rl.close();
  process.exit(0);
}

rl.question(`📦 Enter the desired Package Name / Bundle ID (e.g., com.companyname.myapp): `, (bundleId) => {
  // Determine target bundle ID
  let targetBundleId;
  if (bundleId && bundleId.trim() !== '') {
    targetBundleId = bundleId.trim();
  } else {
    console.log('\n⚠️  No Bundle ID provided. Keeping defaults.');
    rl.close();
    process.exit(0);
  }

  applyBundleId(targetBundleId, existingSourceDir);
  rl.close();
  process.exit(0);
});

function applyBundleId(targetBundleId, existingSourceDir) {

  try {
    console.log(`\n🛠  Applying Bundle ID: ${targetBundleId} to project: ${projectName}...`);

    // --- STEP 1: Android build.gradle (Fixing namespace/applicationId) ---
    if (fs.existsSync(buildGradlePath)) {
        let content = fs.readFileSync(buildGradlePath, 'utf8');

        // Regex to replace any namespace definition with the new one
        content = content.replace(/namespace\s+["'][^"']+["']/g, `namespace "${targetBundleId}"`);

        // Regex to replace any applicationId definition with the new one
        content = content.replace(/applicationId\s+["'][^"']+["']/g, `applicationId "${targetBundleId}"`);

        fs.writeFileSync(buildGradlePath, content, 'utf8');
        console.log('  ✅ Patched Android build.gradle namespace & appId');
    }

    // --- STEP 2: Move Kotlin files to correct directory structure ---
    const bundleParts = targetBundleId.split('.');
    const newJavaPath = path.join(javaBaseDir, ...bundleParts);

    // Find existing source directory (could be old default or any other path)
    const oldJavaPath = existingSourceDir || path.join(javaBaseDir, 'com', 'RNTempByNeeraj');

    if (fs.existsSync(oldJavaPath) && oldJavaPath !== newJavaPath) {
        // Check if newJavaPath is inside oldJavaPath (would cause deletion of new files)
        const normalizedOld = path.normalize(oldJavaPath) + path.sep;
        const normalizedNew = path.normalize(newJavaPath);
        const isNewInsideOld = normalizedNew.startsWith(normalizedOld);

        // Create new directory structure
        fs.mkdirSync(newJavaPath, { recursive: true });

        // Copy files to new location
        const ktFiles = ['MainActivity.kt', 'MainApplication.kt'];
        ktFiles.forEach(file => {
            const srcFile = path.join(oldJavaPath, file);
            const destFile = path.join(newJavaPath, file);
            if (fs.existsSync(srcFile) && fs.statSync(srcFile).isFile()) {
                fs.copyFileSync(srcFile, destFile);
            }
        });

        // Update package declarations in Kotlin files
        ktFiles.forEach(file => {
            const filePath = path.join(newJavaPath, file);
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                content = content.replace(/^package\s+\S+/m, `package ${targetBundleId}`);
                fs.writeFileSync(filePath, content, 'utf8');
            }
        });

        // Only remove old files/directory if new path is NOT inside old path
        if (isNewInsideOld) {
            // New path is inside old path - only delete the source files, not the directory
            ktFiles.forEach(file => {
                const srcFile = path.join(oldJavaPath, file);
                if (fs.existsSync(srcFile)) {
                    fs.unlinkSync(srcFile);
                }
            });
        } else {
            // Safe to remove old directory structure
            rmDirSync(oldJavaPath);

            // Clean up empty parent directories
            let parentDir = path.dirname(oldJavaPath);
            while (parentDir !== javaBaseDir && fs.existsSync(parentDir)) {
                const contents = fs.readdirSync(parentDir);
                if (contents.length === 0) {
                    fs.rmdirSync(parentDir);
                    parentDir = path.dirname(parentDir);
                } else {
                    break;
                }
            }
        }

        console.log('  ✅ Moved and patched Kotlin files to correct package structure');
    } else if (fs.existsSync(oldJavaPath)) {
        // Files are in correct location, just update package declarations
        const ktFiles = ['MainActivity.kt', 'MainApplication.kt'];
        ktFiles.forEach(file => {
            const filePath = path.join(oldJavaPath, file);
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                const currentPkg = content.match(/^package\s+(\S+)/m);
                if (currentPkg && currentPkg[1] !== targetBundleId) {
                    content = content.replace(/^package\s+\S+/m, `package ${targetBundleId}`);
                    fs.writeFileSync(filePath, content, 'utf8');
                }
            }
        });
        console.log('  ✅ Updated package declarations in Kotlin files');
    }

    // --- STEP 3: iOS Project File (Fixing PRODUCT_BUNDLE_IDENTIFIER) ---
    const iosDir = path.join(process.cwd(), 'ios');
    let pbxprojPath = null;

    if (fs.existsSync(iosDir)) {
        const xcodeProjects = fs.readdirSync(iosDir).filter(f => f.endsWith('.xcodeproj'));
        if (xcodeProjects.length > 0) {
            pbxprojPath = path.join(iosDir, xcodeProjects[0], 'project.pbxproj');
        }
    }

    if (pbxprojPath && fs.existsSync(pbxprojPath)) {
        let content = fs.readFileSync(pbxprojPath, 'utf8');

        // Regex to replace PRODUCT_BUNDLE_IDENTIFIER with quoted value
        content = content.replace(/PRODUCT_BUNDLE_IDENTIFIER\s*=\s*"[^"]+";/g, `PRODUCT_BUNDLE_IDENTIFIER = "${targetBundleId}";`);

        // Also handle unquoted values (fallback)
        content = content.replace(/PRODUCT_BUNDLE_IDENTIFIER\s*=\s*[^";]+;/g, `PRODUCT_BUNDLE_IDENTIFIER = "${targetBundleId}";`);

        fs.writeFileSync(pbxprojPath, content, 'utf8');
        console.log('  ✅ Patched iOS PRODUCT_BUNDLE_IDENTIFIER');
    } else {
        console.warn('  ⚠️  Could not find iOS project.pbxproj file');
    }

    console.log('\n✅ Setup Complete! Your Bundle ID is updated.\n');
  } catch (error) {
    console.error('\n❌ Configuration failed:', error.message);
  }
}