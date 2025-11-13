// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// ✅ In-memory item list
let items = [
  { id: 1, name: "Paracetamol 500mg", type: "Tablet", price: 25, description: "Pain reliever and fever reducer." },
  { id: 2, name: "Amoxicillin 250mg", type: "Capsule", price: 40, description: "Used to treat bacterial infections." },
  { id: 3, name: "Vicks Vaporub", type: "Ointment", price: 60, description: "For cold relief and congestion." },
  { id: 4, name: "Omron Blood Pressure Monitor", type: "Device", price: 1800, description: "Accurate home BP measurement." },
  { id: 5, name: "Crocin Advance", type: "Tablet", price: 30, description: "Effective for fever and body ache." }
];

// ✅ Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// ✅ Add new item
app.post("/api/items", (req, res) => {
  const newItem = req.body;
  if (!newItem.name || !newItem.type || !newItem.price) {
    return res.status(400).json({ message: "All fields are required." });
  }
  newItem.id = items.length + 1;
  items.push(newItem);
  res.json({ message: "Item added successfully!", item: newItem });
});

// ✅ Default route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 MediCart running at http://localhost:${PORT}`));
