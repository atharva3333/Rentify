const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/User")
const Property = require('./model/Property');
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

app.post('/properties', async (req, res) => {
    try {
      const { propertyName, address, city, state, price, email } = req.body;
      const newProperty = new Property({ propertyName, address, city, state, price, email });
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

app.get('/properties', async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const properties = await Property.find({ email });
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/all-properties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/properties/:id', async (req, res) => {
    try {
      const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.status(200).json(property);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a property
  app.delete('/properties/:id', async (req, res) => {
    try {
      const property = await Property.findByIdAndDelete(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/user", (req, res) => {
    const email = req.query.email;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    UserModel.findOne({ email: email })
    .then(user => {
        if (!user) {
            // User not found
            res.status(404).json({ message: "User not found" });
        } else {
            // User found, return user data
            res.json(user);
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});
  



app.listen(3001, () => {
    console.log("server is running")
})