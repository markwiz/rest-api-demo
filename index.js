console.log("index.js started ✅");
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // ← CALL IT!

// In-memory data
const thingamabobs = [
  { id: 1, name: "plumbus",    price: 34.59 },
  { id: 2, name: "vana furby", price: 666 },
  { id: 3, name: "sapakas",    price: 2000 }
];

// Simple id generator that survives deletes
let nextId = Math.max(0, ...thingamabobs.map(t => t.id)) + 1;

// Optional friendly root so a browser shows *something*
app.get('/', (_req, res) => {
  res.type('text/plain').send('API is up. Try GET /thingamabobs');
});

// List
app.get('/thingamabobs', (_req, res) => {
  res.json(thingamabobs);
});

// Read one
app.get('/thingamabobs/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = thingamabobs.find(t => t.id === id);
  if (!item) {
    return res.status(404).json({ error: "object not found. Check your thingamabobs id" });
  }
  res.json(item);
});

// Create
app.post('/thingamabobs', (req, res) => {
  const { name, price } = req.body || {};
  if (!name || price == null) {
    return res.status(400).json({ error: "One or multiple parameters missing" });
  }
  const newThingy = { id: nextId++, name, price };
  thingamabobs.push(newThingy);
  res
    .status(201)
    .location(`/thingamabobs/${newThingy.id}`)
    .json(newThingy);
});

// Delete
app.delete('/thingamabobs/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = thingamabobs.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "object not found. Check your thingamabobs id" });
  }
  thingamabobs.splice(idx, 1);
  res.status(204).end(); // 204 has no body
});

// 404 fallback (for any other route)
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌', err);
  res.status(500).json({ error: "Internal error" });
});

app.listen(8080, () => {
  console.log(`API running at: http://localhost:8080`);
});
