"use strict";

const model = require("../model/user_board");
const upload = require("../middlewares/image");

const output = {
    upload: (req, res) => {
        res.render("/board");
    }  
}

const process = {
    //게시글 올리기
    upload: async (req, res) => {
        try {
            const parameter = {
                "title": req.body.title,
                "posting": req.body.posting,
                "images": req.files
            }
            // const result = await model.image_upload(parameter);
            // console.log(result);
            res.render("main");
        } catch (err) {
            console.log("게시 오류");
            res.render("board");
        }
    }
    //게시글 수정하기


    //게시글 읽어오기
};

module.exports = {
    output,
    process
}