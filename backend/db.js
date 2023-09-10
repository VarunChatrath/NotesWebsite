const mongoose = require('mongoose');


async function main() {
  await mongoose.connect('mongodb+srv://Varun:Tmf6UB3IqeHR4USS@cluster0.ajfzpm0.mongodb.net/?retryWrites=true&w=majority');
  console.log("Connected to Mongo Successfully")

}

module.exports = main