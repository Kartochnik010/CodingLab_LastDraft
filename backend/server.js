//importing necessary dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();

//port to run the server
const PORT = 4000;

// importing models for working with MongoDB
let Todo = require("./models/todo.model");
let User = require("./models/user.model")

//applying middleware for additional support
app.use(cors());
app.use(bodyParser.json());

//connecting to database
mongoose.connect("mongodb+srv://root:0000@cluster0.qaotl.mongodb.net/todo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

//once connection was successfully established it will log a message in console
connection.once("open", function() {
  console.log("mongoDB connection successful");
});

//backend routing and rendering
todoRoutes
    .route("/")
    .get(function(req, res) {
        Todo.find(function(err, todos) {
        if (err) {
          console.log(err);
        } else {
          res.json(todos);
        }
    });
});


//user routing
todoRoutes
    .route("/user")
    .get((req, res) =>{
        User.find((err, users) => {
              if (err) {
                  console.log(err);
              } else {
                  res.json(users);
              }
          })

    })

todoRoutes
    .route("/user/:name")
    .get(function(req, res) {
        let name = req.params.name;
        User.find({name: name}, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                res.json(user);
            }
        });
    });

todoRoutes
    .route("/user/registration")
    .post((req, res) =>{
      let user = new User(req.body);
      user.save((err, user) => {
        if (err) {
          console.log(err);
          res.status(400).send("creating user failed");
        } else {
          res.status(200).json({ todo: "user added" });
        }
      });
    })



todoRoutes
    .route("/add")
    .post(function(req, res) {
      let todo = new Todo(req.body);
      todo.save((err, todo) => {
        if (err) {
          console.log(err);
          res.status(400).send("adding todo failed");
        } else {
          res.status(200).json({ todo: "todo added" });
        }
      });
    });

todoRoutes
    .route("/name/:owner")
    .get(function(req, res) {
        let owner = req.params.owner;
        Todo.find({todoOwner: owner}, function(err, todo) {
            if (err) {
                console.log(err);
            } else {
                res.json(todo);
            }
        });
    });

todoRoutes
    .route("/:id")
    .get(function(req, res) {
        console.log(req.params)
      let id = req.params.id;
      Todo.findById(id, function(err, todo) {
        if (err) {
          console.log(err);
        } else {
          res.json(todo);
        }
      });
    });

todoRoutes.route("/delete/:id").post(function(req, res) {
  Todo.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
      res.status(400).send("deleting todo failed");
    } else {
      res.status(200).json({ todo: "todo deleted" });
    }
  });
});

//example of post method supported by express
todoRoutes
    //choosing a route
    .route("/update/:id")
    //writing the logic for the post method
    .post(function(req, res) {
      Todo.findById(req.params.id, function(err, todo) {
        if (!todo) {
          //if tоdo does not exist then it will throw an error
          res.status(404).send("todo not found");
        } else {
          const {
            //extracting data using body-parser
            todoDesc,
            todoCompleted,
            todoResponsible,
            todoPriority
          } = req.body;
          //rewriting data
          todo.todoDesc = todoDesc;
          todo.todoCompleted = todoCompleted;
          todo.todoResponsible = todoResponsible;
          todo.todoPriority = todoPriority;
          //saving new data to database
          todo.save((err, todo) => {
            if (err) {
              console.log(err);
              res.status(400).send("updating todo failed");
            } else {
              res.status(200).json({ todo: "todo updated" });
            }
          });
        }
      });
});

app.use("/todos", todoRoutes);


//setting up the server
app.listen(PORT, function() {
  console.log("Server running on PORT: " + PORT);
});
