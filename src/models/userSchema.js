import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true  
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    reviews:[
        {   
            _id: false,
            username:{
                type:String,
            },
            content:{
                type:String
            }
        }
    ],
    assignedFeedbacks:[
        {   
            _id: false,
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username:{
                type:String,
            }
        }
    ]
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;