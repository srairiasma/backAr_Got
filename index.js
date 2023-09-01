import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import auth from "./routes/AuthentificationRoute.js";
import shopRoutes from "./routes/shop.js";
import User from "../model/User.js"

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.set("strictQuery", true);

app.use(
  session({
    secret: "asma",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());

const mongodbUri =
  "mongodb+srv://asmasrairi:56isr0D9O7p34eY0@cluster0.2bdnucf.mongodb.net/Ar_Got";

mongoose
  .connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/", auth);
app.use("/shop", shopRoutes);

// Define the /users route


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
