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
console.log('🚀 RipenApps Template: Finalizing Native Configuration');
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

rl.question(`📦 Enter the desired Package Name / Bundle ID (e.g., com.ripenapps.myapp): `, (bundleId) => {
  if (!bundleId || bundleId.trim() === '') {
    console.log('\n⚠️  No Bundle ID provided. Keeping defaults.');
    rl.close();
    process.exit(0);
  }

  try {
    console.log(`\n🛠  Applying Bundle ID: ${bundleId} to project: ${projectName}...`);

    // --- STEP 1: Android build.gradle (Fixing namespace/applicationId) ---
    const buildGradlePath = path.join(process.cwd(), 'android', 'app', 'build.gradle');
    if (fs.existsSync(buildGradlePath)) {
        let content = fs.readFileSync(buildGradlePath, 'utf8');

        // Regex to replace any namespace definition with the new one
        content = content.replace(/namespace\s+["'][^"']+["']/g, `namespace "${bundleId}"`);

        // Regex to replace any applicationId definition with the new one
        content = content.replace(/applicationId\s+["'][^"']+["']/g, `applicationId "${bundleId}"`);

        fs.writeFileSync(buildGradlePath, content, 'utf8');
        console.log('  ✅ Patched Android build.gradle namespace & appId');
    }

    // --- STEP 2: Move Kotlin files to correct directory structure ---
    const bundleParts = bundleId.split('.');
    const javaBaseDir = path.join(process.cwd(), 'android', 'app', 'src', 'main', 'java');
    const oldJavaPath = path.join(javaBaseDir, 'com', 'rntempbyneeraj');
    const newJavaPath = path.join(javaBaseDir, ...bundleParts);

    if (fs.existsSync(oldJavaPath) && oldJavaPath !== newJavaPath) {
        // Create new directory structure
        fs.mkdirSync(newJavaPath, { recursive: true });

        // Copy files to new location
        const kotlinFiles = fs.readdirSync(oldJavaPath);
        kotlinFiles.forEach(file => {
            const srcFile = path.join(oldJavaPath, file);
            const destFile = path.join(newJavaPath, file);
            if (fs.statSync(srcFile).isFile()) {
                fs.copyFileSync(srcFile, destFile);
            }
        });

        // Update package declarations in Kotlin files
        const ktFiles = ['MainActivity.kt', 'MainApplication.kt'];
        ktFiles.forEach(file => {
            const filePath = path.join(newJavaPath, file);
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, 'utf8');
                content = content.replace(/^package\s+\S+/m, `package ${bundleId}`);
                fs.writeFileSync(filePath, content, 'utf8');
            }
        });

        // Remove old directory (clean up com/rntempbyneeraj)
        rmDirSync(oldJavaPath);

        // Clean up empty parent directories if needed
        const comDir = path.join(javaBaseDir, 'com');
        if (fs.existsSync(comDir) && fs.readdirSync(comDir).length === 0) {
            fs.rmdirSync(comDir);
        }

        console.log('  ✅ Moved and patched Kotlin files to correct package structure');
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

        // Regex to replace any PRODUCT_BUNDLE_IDENTIFIER assignment
        content = content.replace(/PRODUCT_BUNDLE_IDENTIFIER\s*=\s*["']?[^"';]+["']?;/g, `PRODUCT_BUNDLE_IDENTIFIER = "${bundleId}";`);

        fs.writeFileSync(pbxprojPath, content, 'utf8');
        console.log('  ✅ Patched iOS PRODUCT_BUNDLE_IDENTIFIER');
    } else {
        console.warn('  ⚠️  Could not find iOS project.pbxproj file');
    }

    console.log('\n✅ Setup Complete! Your Bundle ID is updated.\n');
  } catch (error) {
    console.error('\n❌ Configuration failed:', error.message);
  }

  rl.close();
  process.exit(0);
});