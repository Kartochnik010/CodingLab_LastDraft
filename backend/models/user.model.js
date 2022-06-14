// importing mongoose to access functions required to work with mongoDB
const mongoose = require("mongoose");
// Schema is a concept of MongoDB that could be interpreted as a common table that stores keys and values
const Schema = mongoose.Schema;


// This is how the actual schema looks like
let User = new Schema({
    email: {

        // we define the type of the data that is going to be used
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    }
});

//sealing and exporting model
module.exports = mongoose.model("User", User);
