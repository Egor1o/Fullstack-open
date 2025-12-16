require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PhoneBookInstance = require("./models/phonebook");
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

app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.json());

app.get("/info", (req, res) => {
  PhoneBookInstance.find({}).then((result) => {
    const entryCount = result.length;
    const currentDate = new Date();
    res.send(
      `<p>Phonebook has info for ${entryCount} people</p><p>${currentDate}</p>`,
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  PhoneBookInstance.findById(id).then((result) => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
  });
});

app.get("/api/persons", (req, res) => {
  PhoneBookInstance.find({}).then((result) => {
    res.json(result);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PhoneBookInstance.findByIdAndDelete(req.params.id)
    .then((_result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  if (phoneBook.some((entry) => entry.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const phoneBookInstance = new PhoneBookInstance({
    name: body.name,
    number: body.number,
  });

  phoneBookInstance.save().then((result) => {
    return res.json(result);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
