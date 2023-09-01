
import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser";
import User from "../model/User.js"
import jwt from 'jsonwebtoken';

//const argon2i = require ('argon2-ffi').argon2i;
//const crypto = require ('crypto')
const app = express.Router();

app.get('/', async (req, res) => {
  try {
    // Use the User model to find all users in the database
    const users = await User.find();

    // Send the list of users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//****************login*******************
app.post('/account/login', async (req, res) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    res.status(400).send("Invalid credentials");
    return;
  }

  // Find the user by their username
  var userAccount = await User.findOne({ username: username });

  if (userAccount != null && password == userAccount.password) {
    userAccount.lastAuthentification = Date.now();
    await userAccount.save();
    console.log("Retrieving account...");

    // Generate a token only for a successful login
    const token = jwt.sign({ id: userAccount._id }, 'asma');

    // Send both the token and user account data in the response
    res.json({ token, user: userAccount });
  } else {
    res.status(401).send("Invalid credentials");
  }
});



//*****************create account**************
app.post('/account/create', async (req, res, next) => {
  const newaccount = new User(req.body)
  //req.session.userId = savedUser._id;
  try {
    const savedaccount = await newaccount.save()
    res.status(200).json("user is created")

  } catch (error) {
    next(error)
  }

});
app.post('/updatecoins/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { coins } = req.body;

  try {
    // Find the user by their user ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Update the user's coins
    user.coins = coins;
    await user.save();

    res.status(200).send('Coins updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
/*
// Save Valarians to the user's account
app.post('/updatevalarians/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { valarians } = req.body;

  try {
    // Find the user by their user ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Update the user's Valarians
    user.valarians = valarians;
    await user.save();

    res.status(200).send('Valarians updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});
*/
//********coins**************/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let savedCoins = 0;

app.post("/savecoins", async (req, res) => {
  const { userId, coins } = req.body;

  try {
    // Find the user by their user ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Update the user's coins
    user.coins += parseInt(coins);
    await user.save();

    res.status(200).send("Coins saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/getcoins/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by their user ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Return the user's coins
    res.status(200).json({ coins: user.coins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.post("/saveValarians", async (req, res) => {
  const { userId, valarians } = req.body;

  try {
    // Find the user by their user ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Update the user's Valarians
    user.Valarians += parseInt(valarians);
    await user.save();

    res.status(200).send("Valarians saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/getValarians/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by their user ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Return the user's Valarians
    res.status(200).json({ valarians: user.Valarians });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




export default app;
