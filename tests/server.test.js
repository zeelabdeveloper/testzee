const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
console.log('Running server tests...');
const TEST_PORT = 4501;
let baseUrl, server;

before(async () => {
  // Server ko test port pe start karo
  process.env.PORT = String(TEST_PORT);
  const app = require('../server.js');
  baseUrl = `http://localhost:${TEST_PORT}`;

  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 500));
});

// 🧪 Test 1: Server status check
it('GET /api/status → server should be running', async () => {
  const res = await fetch(`${baseUrl}/api/status`);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.ok(data.status.includes('running'));
  assert.ok(data.uptime);
  assert.ok(data.nodeVersion);
});

// 🧪 Test 2: Hello API with name
it('GET /api/hello?name=CI-CD → should return greeting', async () => {
  const res = await fetch(`${baseUrl}/api/hello?name=CI-CD`);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.ok(data.message.includes('CI-CD'));
  assert.ok(data.timestamp);
});

// 🧪 Test 3: Hello API without name (default)
it('GET /api/hello → should default to Guest', async () => {
  const res = await fetch(`${baseUrl}/api/hello`);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.ok(data.message.includes('Guest'));
});

// 🧪 Test 4: Calculator add
it('GET /api/calc/add?a=10&b=20 → should return 30', async () => {
  const res = await fetch(`${baseUrl}/api/calc/add?a=10&b=20`);
  assert.strictEqual(res.status, 200);

  const data = await res.json();
  assert.strictEqual(data.result, 30);
});

// 🧪 Test 5: Homepage HTML serve karta hai
it('GET / → should serve HTML homepage', async () => {
  const res = await fetch(baseUrl);
  assert.strictEqual(res.status, 200);
  assert.ok(res.headers.get('content-type').includes('html'));
});
