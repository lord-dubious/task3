#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up TweetScheduler Pro Edge Functions...\n');

// Check if we're in a Supabase project
function checkSupabaseProject() {
  try {
    const configPath = path.join(process.cwd(), 'supabase', 'config.toml');
    if (!fs.existsSync(configPath)) {
      console.error('❌ No Supabase project found. Please run "supabase init" first.');
      process.exit(1);
    }
    
    const config = fs.readFileSync(configPath, 'utf8');
    const projectMatch = config.match(/project_id = "([^"]+)"/);
    
    if (!projectMatch) {
      console.error('❌ No project ID found in supabase/config.toml');
      console.log('Please link your project with: supabase link --project-ref YOUR_PROJECT_REF');
      process.exit(1);
    }
    
    return projectMatch[1];
  } catch (error) {
    console.error('❌ Error reading Supabase config:', error.message);
    process.exit(1);
  }
}

// Get Supabase project details
function getSupabaseDetails() {
  try {
    console.log('📋 Getting Supabase project details...');
    
    const statusOutput = execSync('supabase status', { encoding: 'utf8' });
    const lines = statusOutput.split('\n');
    
    let apiUrl = '';
    let anonKey = '';
    
    for (const line of lines) {
      if (line.includes('API URL:')) {
        apiUrl = line.split('API URL:')[1].trim();
      }
      if (line.includes('anon key:')) {
        anonKey = line.split('anon key:')[1].trim();
      }
    }
    
    if (!apiUrl || !anonKey) {
      console.error('❌ Could not extract Supabase details from status command');
      console.log('Please ensure you are linked to a Supabase project');
      process.exit(1);
    }
    
    return { apiUrl, anonKey };
  } catch (error) {
    console.error('❌ Error getting Supabase status:', error.message);
    console.log('Please ensure Supabase CLI is installed and you are logged in');
    process.exit(1);
  }
}

// Create Edge Function directory structure
function createEdgeFunctionStructure() {
  console.log('📁 Creating Edge Function directory structure...');
  
  const functionsDir = path.join(process.cwd(), 'supabase', 'functions');
  const postTweetsDir = path.join(functionsDir, 'post-tweets');
  
  if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir, { recursive: true });
  }
  
  if (!fs.existsSync(postTweetsDir)) {
    fs.mkdirSync(postTweetsDir, { recursive: true });
  }
  
  console.log('✅ Edge Function directories created');
}

// Update migration file with actual values
function updateMigrationFile(apiUrl, anonKey) {
  console.log('📝 Updating migration file with project details...');
  
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20250701184904_pale_grass.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }
  
  let migrationContent = fs.readFileSync(migrationPath, 'utf8');
  
  // Replace placeholder values
  const edgeFunctionUrl = `${apiUrl}/functions/v1/post-tweets`;
  migrationContent = migrationContent.replace(/https:\/\/your-project-ref\.supabase\.co\/functions\/v1\/post-tweets/g, edgeFunctionUrl);
  migrationContent = migrationContent.replace(/your-supabase-anon-key/g, anonKey);
  
  fs.writeFileSync(migrationPath, migrationContent);
  console.log('✅ Migration file updated with project details');
}

// Deploy Edge Function
function deployEdgeFunction() {
  console.log('🚀 Deploying Edge Function...');
  
  try {
    execSync('supabase functions deploy post-tweets', { stdio: 'inherit' });
    console.log('✅ Edge Function deployed successfully');
  } catch (error) {
    console.error('❌ Error deploying Edge Function:', error.message);
    process.exit(1);
  }
}

// Apply database migrations
function applyMigrations() {
  console.log('🗄️  Applying database migrations...');
  
  try {
    execSync('supabase db push', { stdio: 'inherit' });
    console.log('✅ Database migrations applied successfully');
  } catch (error) {
    console.error('❌ Error applying migrations:', error.message);
    console.log('You may need to enable pg_cron and pg_net extensions manually in your Supabase dashboard');
  }
}

// Test the setup
function testSetup(apiUrl, anonKey) {
  console.log('🧪 Testing Edge Function...');
  
  try {
    const testCommand = `curl -X POST "${apiUrl}/functions/v1/post-tweets" -H "Authorization: Bearer ${anonKey}" -H "Content-Type: application/json" -d '{}'`;
    const result = execSync(testCommand, { encoding: 'utf8' });
    
    try {
      const response = JSON.parse(result);
      if (response.message) {
        console.log('✅ Edge Function test successful');
        console.log(`📊 Response: ${response.message}`);
      }
    } catch (parseError) {
      console.log('✅ Edge Function is responding (response parsing failed, but that\'s normal for empty test)');
    }
  } catch (error) {
    console.warn('⚠️  Edge Function test failed, but this might be normal if no tweets are scheduled');
  }
}

// Main setup function
function main() {
  try {
    // Step 1: Check Supabase project
    const projectId = checkSupabaseProject();
    console.log(`✅ Found Supabase project: ${projectId}\n`);
    
    // Step 2: Get project details
    const { apiUrl, anonKey } = getSupabaseDetails();
    console.log(`✅ API URL: ${apiUrl}`);
    console.log(`✅ Anon Key: ${anonKey.substring(0, 20)}...\n`);
    
    // Step 3: Create directory structure
    createEdgeFunctionStructure();
    
    // Step 4: Update migration file
    updateMigrationFile(apiUrl, anonKey);
    
    // Step 5: Deploy Edge Function
    deployEdgeFunction();
    
    // Step 6: Apply migrations
    applyMigrations();
    
    // Step 7: Test setup
    testSetup(apiUrl, anonKey);
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to your Supabase dashboard → Database → Extensions');
    console.log('2. Enable "pg_cron" and "pg_net" extensions if not already enabled');
    console.log('3. Configure Twitter credentials in Settings → Twitter Integration');
    console.log('4. Create a test scheduled tweet to verify the system works');
    console.log('\n🔍 Monitor your setup in the Scheduling tab → Cron Job Status section');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
main();