const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4500;

// 📄 Static files serve karo (public/ folder)
app.use(express.static(path.join(__dirname, 'public')));

// 🏠 Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 👋 GET /api/hello?name=XYZ
app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({
    message: `Hello, ${name}! 🚀 CI/CD seekh rahe ho!`,
    timestamp: new Date().toISOString()
  });
});

// ✅ GET /api/status - Server health check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Server is running ✅',
    port: PORT,
    uptime: `${Math.floor(process.uptime())} seconds`,
    nodeVersion: process.version
  });
});

// ➕ GET /api/calc/add?a=2&b=3
app.get('/api/calc/add', (req, res) => {
  const a = parseFloat(req.query.a) || 0;
  const b = parseFloat(req.query.b) || 0;
  res.json({ operation: 'add', a, b, result: a + b });
});

// 🚀 Server start
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  🚀 CI/CD Learning Server           ║
║──────────────────────────────────────║
║  → http://localhost:${PORT}            ║
║──────────────────────────────────────║
║  📡 APIs:                           ║
║  GET /api/hello?name=test          ║
║  GET /api/status                   ║
║  GET /api/calc/add?a=2&b=3        ║
╚══════════════════════════════════════╝
  `);
});

module.exports = app;
