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

rl.question(`📦 Enter the desired Package Name / Bundle ID (e.g., com.ripenapps.myapp): `, (bundleId) => {
  if (!bundleId || bundleId.trim() === '') {
    console.log('\n⚠️  No Bundle ID provided. Keeping defaults.');
    rl.close();
    process.exit(0);
  }

  try {
    console.log(`\n🛠  Applying Bundle ID: ${bundleId} to project: ${projectName}...`);

    // --- STEP 1: Run Standard Rename Tool FIRST ---
    // We use --skip-git-status-check because we are in the middle of a generation process
    // This moves folders (e.g. java/com/DummyApp -> java/com/ripenapps/myapp)
    console.log('  -> Running react-native-rename...');
    try {
        execSync(`npx react-native-rename "${projectName}" -b "${bundleId}"`, { stdio: 'inherit' });
    } catch (e) {
        console.warn('  ! Rename tool warning (proceeding to manual patch)...');
    }

    // --- STEP 2: Manual Patching (Regex based for robustness) ---
    // We do this AFTER rename to ensure we catch anything it missed or reverted
    
    // Android build.gradle (Fixing namespace/applicationId)
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

    // iOS Project File (Fixing PRODUCT_BUNDLE_IDENTIFIER)
    // Dynamically find the .xcodeproj folder since its name may vary
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
        // This catches "org.reactjs.native.example..." or anything else
        content = content.replace(/PRODUCT_BUNDLE_IDENTIFIER\s*=\s*["'][^"']+["'];/g, `PRODUCT_BUNDLE_IDENTIFIER = "${bundleId}";`);

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