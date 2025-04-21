import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const dbFile = path.resolve(__dirname, "db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { dogs: [] });
await db.read();
await db.write();

app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));
app.get("/dogs", async (req, res) => {
  await db.read();
  res.json(db.data.dogs || []);
});

app.post("/dogs", async (req, res) => {
  await db.read();
  const newDog = {
    ...req.body,
    id: Date.now().toString(),
  };
  db.data.dogs.push(newDog);
  await db.write();
  res.status(201).json(newDog);
});

app.get("/dogs/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Recieved DELETE for ID:", id);
  await db.read();
  db.data.dogs = db.data.dogs.filter((dog) => dog.id != id);
  await db.write();
  res.status(204).end();
});

app.patch("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  await db.read();
  const dog = db.data.dogs.find((dog) => dog.id == id);
  if (!dog) {
    return res.status(404).json({ error: "Dog not found" });
  }
  Object.assign(dog, updateData);
  await db.write();
  res.json(dog);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
