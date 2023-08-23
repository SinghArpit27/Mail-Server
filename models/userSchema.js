import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    // plan: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Plan',
    //     required: true
    // },
    otpVerification:{
        type: String
    },
    otpExpiration:{
        type: Number,
    },
    is_varified:{
        type:Number,
        default:0
    },
    isAdmin:{
        type: Number,
        default: 0
    }
},
{timestamps: true});

export default mongoose.model('User', userSchema);