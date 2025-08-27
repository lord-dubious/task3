import { test, strict as assert } from 'node:test';

// Basic smoke test that the hook file exists and exports the expected factory name
import * as mod from '../src/hooks/useStorage';

test('useStorage hook exports factory', () => {
  assert.ok(typeof (mod as { useStorage?: unknown }).useStorage === 'function');
});

