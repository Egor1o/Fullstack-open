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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
