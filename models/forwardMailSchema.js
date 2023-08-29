import mongoose from "mongoose";

const forwardMailSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    mailId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mail'
    },
},
{timestamps: true});

export default mongoose.model('ForwardMail', forwardMailSchema);