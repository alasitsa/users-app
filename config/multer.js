const multer = require("multer");

module.exports = {
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"||
            file.mimetype === "image/jpeg"){
            cb(null, true);
        }
        else{
            cb(null, false);
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, "resources");
        },
        filename: (req, file, cb) => {
            const filename = file.originalname.split('.');
            const filetype = filename[filename.length - 1];
            cb(null, Date.now() + "." + filetype);
        }
    })
}