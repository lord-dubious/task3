import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // For GCM, this is always 16
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const ITERATIONS = 100000;

/**
 * Get encryption key from environment variable
 */
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  if (key.length < 32) {
    throw new Error('ENCRYPTION_KEY must be at least 32 characters long');
  }
  return key;
}

/**
 * Derive a key from the master key using PBKDF2
 */
function deriveKey(masterKey: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(masterKey, salt, ITERATIONS, 32, 'sha512');
}

/**
 * Encrypt a string using AES-256-GCM
 * Returns base64 encoded string containing salt + iv + tag + encrypted data
 */
export function encrypt(text: string): string {
  if (!text) return text;
  
  try {
    const masterKey = getEncryptionKey();
    
    // Generate random salt and IV
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    
    // Derive key from master key and salt
    const key = deriveKey(masterKey, salt);
    
    // Create cipher
    const cipher = crypto.createCipherGCM(ALGORITHM, key, iv);
    cipher.setAAD(salt); // Use salt as additional authenticated data

    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get the authentication tag
    const tag = cipher.getAuthTag();

    // Combine salt + iv + tag + encrypted data
    const combined = Buffer.concat([
      salt,
      iv,
      tag,
      Buffer.from(encrypted, 'hex')
    ]);

    return combined.toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt a string using AES-256-GCM
 * Expects base64 encoded string containing salt + iv + tag + encrypted data
 */
export function decrypt(encryptedData: string): string {
  if (!encryptedData) return encryptedData;
  
  try {
    const masterKey = getEncryptionKey();
    
    // Decode from base64
    const combined = Buffer.from(encryptedData, 'base64');
    
    // Extract components
    const salt = combined.subarray(0, SALT_LENGTH);
    const iv = combined.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = combined.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = combined.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    
    // Derive key from master key and salt
    const key = deriveKey(masterKey, salt);
    
    // Create decipher
    const decipher = crypto.createDecipherGCM(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    decipher.setAAD(salt); // Use salt as additional authenticated data

    // Decrypt the data
    let decrypted = decipher.update(encrypted, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Encrypt an object's sensitive fields
 */
export function encryptCredentials(credentials: {
  twitterApiKey?: string;
  twitterApiSecret?: string;
  accessToken?: string;
  accessTokenSecret?: string;
}): typeof credentials {
  return {
    twitterApiKey: credentials.twitterApiKey ? encrypt(credentials.twitterApiKey) : credentials.twitterApiKey,
    twitterApiSecret: credentials.twitterApiSecret ? encrypt(credentials.twitterApiSecret) : credentials.twitterApiSecret,
    accessToken: credentials.accessToken ? encrypt(credentials.accessToken) : credentials.accessToken,
    accessTokenSecret: credentials.accessTokenSecret ? encrypt(credentials.accessTokenSecret) : credentials.accessTokenSecret,
  };
}

/**
 * Decrypt an object's sensitive fields
 */
export function decryptCredentials(credentials: {
  twitterApiKey?: string;
  twitterApiSecret?: string;
  accessToken?: string;
  accessTokenSecret?: string;
}): typeof credentials {
  return {
    twitterApiKey: credentials.twitterApiKey ? decrypt(credentials.twitterApiKey) : credentials.twitterApiKey,
    twitterApiSecret: credentials.twitterApiSecret ? decrypt(credentials.twitterApiSecret) : credentials.twitterApiSecret,
    accessToken: credentials.accessToken ? decrypt(credentials.accessToken) : credentials.accessToken,
    accessTokenSecret: credentials.accessTokenSecret ? decrypt(credentials.accessTokenSecret) : credentials.accessTokenSecret,
  };
}
