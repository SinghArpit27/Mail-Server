import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    limits:{
        maxCharacters: Number,
        maxFiles: Number,
        maxBCC: Number,
        maxCC: Number
    },
    allowRARFiles: Boolean,
},
{timestamps: true});

export default mongoose.model('Plan', planSchema);