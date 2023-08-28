import mongoose, { Schema } from "mongoose";

const mailSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cc: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    bcc: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    attachments: {
        type: Array,
        default: [],
    },

    // forwardedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bookmarks: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },

    softDeleted: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    },

    // // Indexes
    // 'recipients.cc': 1, // Index on 'cc' field within 'recipients' array
    // 'recipients.bcc': 1,
},
{timestamps: true});

export default mongoose.model('Mail', mailSchema);
