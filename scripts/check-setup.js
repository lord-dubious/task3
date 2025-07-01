#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking TweetScheduler Pro Setup...\n');

// Check functions
const checks = [
  {
    name: 'Supabase CLI',
    check: () => {
      try {
        execSync('supabase --version', { stdio: 'pipe' });
        return { success: true, message: 'Supabase CLI is installed' };
      } catch {
        return { success: false, message: 'Supabase CLI not found. Install from https://supabase.com/docs/guides/cli' };
      }
    }
  },
  {
    name: 'Supabase Project',
    check: () => {
      try {
        const configPath = path.join(process.cwd(), 'supabase', 'config.toml');
        if (fs.existsSync(configPath)) {
          const config = fs.readFileSync(configPath, 'utf8');
          const projectMatch = config.match(/project_id = "([^"]+)"/);
          if (projectMatch) {
            return { success: true, message: `Linked to project: ${projectMatch[1]}` };
          }
        }
        return { success: false, message: 'No Supabase project linked. Run: supabase link --project-ref YOUR_PROJECT_REF' };
      } catch {
        return { success: false, message: 'Error checking Supabase project configuration' };
      }
    }
  },
  {
    name: 'Edge Function Files',
    check: () => {
      const functionPath = path.join(process.cwd(), 'supabase', 'functions', 'post-tweets', 'index.ts');
      if (fs.existsSync(functionPath)) {
        return { success: true, message: 'Edge Function files exist' };
      }
      return { success: false, message: 'Edge Function files missing. Run setup script first.' };
    }
  },
  {
    name: 'Migration Files',
    check: () => {
      const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20250701184904_pale_grass.sql');
      if (fs.existsSync(migrationPath)) {
        const content = fs.readFileSync(migrationPath, 'utf8');
        if (content.includes('your-project-ref') || content.includes('your-supabase-anon-key')) {
          return { success: false, message: 'Migration file contains placeholder values. Run setup script to update.' };
        }
        return { success: true, message: 'Migration file is configured' };
      }
      return { success: false, message: 'Migration file missing' };
    }
  },
  {
    name: 'Edge Function Deployment',
    check: () => {
      try {
        const output = execSync('supabase functions list', { encoding: 'utf8' });
        if (output.includes('post-tweets')) {
          return { success: true, message: 'Edge Function is deployed' };
        }
        return { success: false, message: 'Edge Function not deployed. Run: supabase functions deploy post-tweets' };
      } catch {
        return { success: false, message: 'Cannot check Edge Function deployment status' };
      }
    }
  }
];

// Run all checks
let allPassed = true;
for (const check of checks) {
  const result = check.check();
  const icon = result.success ? '✅' : '❌';
  console.log(`${icon} ${check.name}: ${result.message}`);
  if (!result.success) allPassed = false;
}

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 All checks passed! Your setup is ready.');
  console.log('\n📋 To complete setup:');
  console.log('1. Enable pg_cron and pg_net extensions in Supabase dashboard');
  console.log('2. Configure Twitter credentials in the app');
  console.log('3. Test with a scheduled tweet');
} else {
  console.log('⚠️  Some checks failed. Please address the issues above.');
  console.log('\n🔧 Quick fix: Run the setup script:');
  console.log('   node scripts/setup-edge-functions.js');
}

console.log('\n📚 For detailed setup instructions, see: docs/DEPLOYMENT_SETUP.md');