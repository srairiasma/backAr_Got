import express from "express"
import session from 'express-session'
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import auth from "./routes/AuthentificationRoute.js" 
import shopRoutes from './routes/shop.js';
import User from "./model/User.js"

//import shop from "./routes/ShopItem.js"
const app = express()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(express.json());


mongoose.set('strictQuery', true);
//setting the database
dotenv.config() ; 
export const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
    
    } catch (error) {
        throw error
    }
}
 
// Set up session
app.use(session({
    secret: 'asma',
    resave: false,
    saveUninitialized: true
  }));

app.use(auth)
app.use('/shop', shopRoutes);



app.listen(13756, () => {
    connect() ; 
    console.log("listening on " + 13756);
})
