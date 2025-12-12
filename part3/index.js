const express = require("express");
const app = express();

const phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/info", (req, res) => {
  const entryCount = phoneBook.length;
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${entryCount} people</p><p>${currentDate}</p>`,
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phoneBook.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons", (req, res) => {
  res.json(phoneBook);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const index = phoneBook.findIndex((p) => p.id === id);
  if (index !== -1) {
    phoneBook.splice(index, 1);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const newId = Math.floor(Math.random() * 10000);
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  const newEntry = {
    id: newId.toString(),
    name: body.name,
    number: body.number,
  };

  phoneBook.push(newEntry);

  return res.json(newEntry);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
