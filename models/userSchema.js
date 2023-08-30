import mongoose from "mongoose";

const allowedPlanNames = ['Basic Plan', 'Intermediate Plan', 'Enterprise Plan'];

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
    plan: {
        type: String,
        required: true,
        validate: {
        validator: function (value) {
            return allowedPlanNames.includes(value);
        },
        message: 'Invalid plan name. Please choose from Basic Plan, Intermediate Plan, or Enterprise Plan',
        },
    },
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