const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    passwordAuth: {
        type: String
    }
});

module.exports = mongoose.model("User", User);
