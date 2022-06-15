const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  todoOwner: {
    type: String
  },
  todoName: {
    type: String
  },
  todoDesc: {
    type: String
  },
  todoDate: {
    type: String
  }
});

module.exports = mongoose.model("Todo", Todo);
