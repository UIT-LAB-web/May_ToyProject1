"use strict";

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            console.log("이미지 파일 확인");
            cb.apply(null, "public/images/");
        }
        else {
            console.log("이미지가 아닙니다.");
        }
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname.ext) + "-" + Data.now() + ext);
    }
});

const upload = multer ({ 
    storage: storage,
    limits: {
        files: 10
    }
});

module.exports = {
    storage, 
    upload
}