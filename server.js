const express = require("express");
const path = require("path");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Low(new JSONFile("db.json"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));

app.get("/dogs", async (req, res) => {
  await db.read();
  res.json(db.data.dogs || []);
});

app.post("/dogs", async (req, res) => {
  await db.read();
  const newDog = req.body;
  db.data.dogs.push(newDog);
  await db.write();
  res.status(201).json(newDog);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  await db.read();
  db.data.dogs = db.data.dogs.filter((dog) => dog.id !== id);
  await db.write();
  res.status(204).end();
});

app.patch("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  await db.read();
  const dog = db.data.dogs.find((dog) => dog.id === id);
  if (!dig) {
    return res.status(404).json({ error: "Dog not found" });
  }
  Object.assign(dog < updateData);
  await db.write();
  res.json(dog);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
