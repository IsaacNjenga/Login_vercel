const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/employee");

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin:[""],
    methods:["POST","GET"],
    credentials: true
  }
));

mongoose.connect(
 "mongodb+srv://IsaacNjenga:cations!@cluster0.xf14h71.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existing");
    }
  });
});

app.listen(3001, () => {
  console.log("Connected");
});
