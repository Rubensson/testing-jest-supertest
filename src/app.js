import express from "express";
import { v4 } from "uuid"; //uuid, modulo para generar id {version 4}

const app = express();
app.use(express.json()); //middleware para tranformar json del response

//request routes
app.get("/", (req, res) => {
  res.send("Esta es una pracrica de Testing NodeJS");
});
app.get("/tasks", (req, res) => {
  res.json([]);
});
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.sendStatus(400);

  res.json({
    title,
    description,
    id: v4(),
  });
});

export default app;
