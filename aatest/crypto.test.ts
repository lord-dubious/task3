import { test, strict as assert } from 'node:test';
import { encrypt, decrypt, encryptCredentials, decryptCredentials } from '../server/utils/crypto';

process.env.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012secretsecret';

test('encrypt/decrypt roundtrip returns original string', () => {
  const original = 'hello world';
  const encrypted = encrypt(original);
  assert.ok(encrypted && encrypted !== original);
  const decrypted = decrypt(encrypted);
  assert.equal(decrypted, original);
});

test('encryptCredentials/decryptCredentials roundtrip', () => {
  const creds = {
    twitterApiKey: 'key',
    twitterApiSecret: 'secret',
    accessToken: 'token',
    accessTokenSecret: 'toksec',
  };
  const enc = encryptCredentials(creds);
  assert.ok(enc.twitterApiKey && enc.twitterApiKey !== creds.twitterApiKey);
  const dec = decryptCredentials(enc as typeof creds);
  assert.equal(dec.twitterApiKey, creds.twitterApiKey);
  assert.equal(dec.twitterApiSecret, creds.twitterApiSecret);
  assert.equal(dec.accessToken, creds.accessToken);
  assert.equal(dec.accessTokenSecret, creds.accessTokenSecret);
});

