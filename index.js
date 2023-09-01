import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; // Add CORS support

import auth from "./routes/AuthentificationRoute.js";
import shopRoutes from "./routes/shop.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.set("strictQuery", true);

// Set up session
app.use(
  session({
    secret: "asma",
    resave: false,
    saveUninitialized: true,
  })
);

// Enable CORS for all routes
app.use(cors());

// Database connection using an environment variable
const mongodbUri = process.env.MONGODB_URI || "mongodb+srv://asmasrairi:56isr0D9O7p34eY0@cluster0.2bdnucf.mongodb.net/Ar_Got";

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(auth);
app.use("/shop", shopRoutes);

// Dynamically determine the port or use a default value
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
