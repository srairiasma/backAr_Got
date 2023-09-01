import mongoose from "mongoose" 

const UserSchema = new mongoose.Schema(
    {
        username : {
            type : String 
        } ,
        password : {
            type : String 
        },
        email : {
            type : String 
        },
        phonenumber : {
            type : Number
        },
        coins : {
            type : Number
        },
        Valarians: {
            type : Number
        },
        lastAuthentification : {
            type : Date 
        }
    }
)

export default mongoose.model("User",UserSchema)