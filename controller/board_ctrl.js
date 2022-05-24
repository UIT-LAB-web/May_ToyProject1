"use strict";

const model = require("../model/user_board");

const output = {
    upload: (req, res) => {
        res.render("/board");
    } ,
    edit: (req, res) => {
        res.render("/edit");
    }
}

const process = {
    upload: async (req, res) => {
        try {
            const files = req.files;
            let str = "";
            for (let i in files) {
                console.log(i + " : " + files[i].filename);
                str += files[i].filename + ", ";
            }
            const string = str.slice(0, -2);
            console.log(string)
            const parameter = {
                "title": req.body.title,
                "posting": req.body.posting,
                "images": string
            }
            if(string == "") {
                console.log("파일 없음");
            }
            else{
                const result = await model.post_upload(parameter);
                console.log(result);
                res.render("main");
            }
        } catch (err) {
            console.log("게시 오류");
            res.render("board");
        }
    },
    edit: async (req, res) => {
        try {
            const parameter = {
                "title": req.body.title,
                "posting": req.body.posting
            }
            const edit = await model.post_edit(parameter);
            console.log(edit);
            res.render("main");
        } catch (err) {
            console.log("수정 오류");
            res.render("edit");
        }
    },
    //게시글 읽어오기
    loading: async (req, res) => {
        try {
            
        } catch (err) {
            console.log("")
        }
    }
};

module.exports = {
    output,
    process
}