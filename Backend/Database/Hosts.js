const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/NCR')
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

const hostschema = new mongoose.Schema({}, { strict: false });

const Hostmodel = mongoose.model("Hosts", hostschema);

module.exports = Hostmodel;
