import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mail',
        required: true
    },
},
{timestamps: true});

export default mongoose.model('Bookmark', bookmarkSchema);