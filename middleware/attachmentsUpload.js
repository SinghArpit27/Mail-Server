import multer from 'multer';
import path from 'path';
import User from '../models/userSchema.js';
import { fileURLToPath } from 'url';


// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Attachments should be Image
const attachmentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname, '../public/uploads'));
    },

    filename:function(req,file,cb){
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileValidation = async (req, file, cb) => {
    const userData = await User.findById({ _id: req.userId });
    if(!userData){
        cb(new Error("User Not Exist"));
    }else{
        const userPlan = userData.plan;
        if(userPlan == 'Basic Plan' || userPlan == 'Intermediate Plan'){
            
            if (file.mimetype === 'application/vnd.rar' ||
            file.mimetype === 'application/x-rar-compressed' ||
            file.originalname.endsWith('.part.rar') ||
            file.originalname.endsWith('.r00') ||
            file.originalname.endsWith('.r01') ||
            file.originalname.endsWith('.rev') ||
            file.originalname.endsWith('.rar')) {
                cb(new Error('rar files are not allowed'));
            } else {
                cb(null, true);
            }
        }else{
            cb(null, true);
        }
    }
}

const multipleUploads = multer({ storage: attachmentStorage, fileFilter: fileValidation }).array('attachments');



export default multipleUploads;