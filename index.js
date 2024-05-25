const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/User")
const path = require("path");

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Atharva:Atharva@cluster0.idksxfa.mongodb.net/");



app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.status(200).json({ message: "Success", id: user._id });
            } else {
                res.json({ message: "The password is incorrect" });
            }
        } else {
            res.json({ message: "No record existed" });
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



app.post("/register", (req, res) => {
    const { email, name, password } = req.body;

    // Check if email already exists
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            // Email already exists
            res.json({ message: "Email already in use" });
        } else {
            // Email does not exist, proceed with registration
            UserModel.create({ email, name, password })
            .then(newUser => res.json({ id: newUser._id }))
            .catch(err => res.status(500).json({ error: err.message }));
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



app.listen(3001, () => {
    console.log("server is running")
})