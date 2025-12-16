const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://egorklo147:${password}@cluster-fullstack.mpqqeyk.mongodb.net/phonebook?appName=Cluster-fullstack`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const phoneBookInstanceSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneBookInstance = mongoose.model(
  "PhoneBookInstance",
  phoneBookInstanceSchema,
);

if (process.argv.length === 5) {
  const phoneBookInstance = new PhoneBookInstance({
    name: process.argv[3],
    number: process.argv[4],
  });

  phoneBookInstance.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  console.log("phonebook:");
  PhoneBookInstance.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
}
