import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env from server root
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log('✅ Found .env file');
} else {
    console.error('❌ .env file NOT found at:', envPath);
    console.log('👉 Please copy .env.example to .env and fill in your credentials.');
    process.exit(1);
}

const requiredVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL'
];

let hasError = false;

console.log('\nChecking Authentication Configuration...\n');

requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (!value || value.includes('your_')) {
        console.error(`❌ Missing or default value for: ${varName}`);
        hasError = true;
    } else {
        console.log(`✅ ${varName} is set`);
    }
});

// Check URL formats
const urlVars = ['GOOGLE_CALLBACK_URL'];
urlVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        try {
            const url = new URL(value);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                console.warn(`⚠️  ${varName} should start with http:// or https://`);
            }
            if (!value.includes('localhost') && !value.includes('127.0.0.1')) {
                // In production this is fine, but strictly for local debugging
            }
            
            // Warn if specific paths are missing (common mistake)
            if (varName === 'GOOGLE_CALLBACK_URL' && !value.endsWith('/api/auth/google/callback')) {
                console.warn(`⚠️  ${varName} usually ends with /api/auth/google/callback. Current: ${value}`);
            }

        } catch (e) {
            console.error(`❌ ${varName} is not a valid URL: ${value}`);
            hasError = true;
        }
    }
});

if (hasError) {
    console.log('\n❌ Configuration issues found. Auth will likely fail.');
} else {
    console.log('\n✅ Configuration looks good! (Make sure Client IDs/Secrets are valid)');
}
