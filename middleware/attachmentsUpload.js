import multer from "multer";
import User from "../models/User.js";
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/images/' , function(){
        if (error)
        throw error;
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname,function(error1,success){
        if(error1)
        throw error1;
    });
  },
});


const fileFilter = async function  (req, file, cb) {
  // console.log(req.userId,"in upload");
  const userData = await User.findById(req.userId);
  if(!userData)
  {
    cb(new Error('User doesnot exists anymore'))
  }
  else{
    // console.log(userData,"userdataaa");
    const UserPlan = userData.plan;
    if(UserPlan == 'basic' || UserPlan == 'intermediate')
    {
      // to check rar file only these extension are provided
      if (file.mimetype === 'application/vnd.rar' ||
      file.mimetype === 'application/x-rar-compressed' ||
      file.originalname.endsWith('.part.rar') ||
      file.originalname.endsWith('.r00') ||
      file.originalname.endsWith('.r01') ||
      file.originalname.endsWith('.rev') ||
      file.originalname.endsWith('.rar1')) {
        cb(new Error('.rar files are not allowed'))
      } else {
        cb(null, true);
      }
    }else{
      cb(null, true);
    }
  }
};
var upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).array('fileUpload');


export default upload ;
