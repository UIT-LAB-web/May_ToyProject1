"use strict";

const model = require("../model/user_board");

const output = {
    main: (req, res) => {
        res.render("/main");
    },
    upload: (req, res) => {
        res.send("/upload");
    } ,
    edit: (req, res) => {
        res.send("/edit");
    },
    loading: (req, res) => {
        res.render("/loading");
    }
}

const process = {
    main: async (req, res) => {
        const result = await model.post_main(req.session.user.id);
        console.log(result);
        res.render("main");
    },
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
            console.log(parameter)
            const result = await model.post_upload(req.session.user.id, parameter);
            console.log(result);
            res.render("main");
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
            const edit = await model.post_edit(req.session.user.id, parameter);
            console.log(edit);
            res.render("main");
        } catch (err) {
            console.log("수정 오류");
            res.render("edit");
        }
    },
    loading: async (req, res) => {
        try {
            const result = await model.post_loading(req.session.user.id);
            console.log(result);
            res.render("main");
        } catch (err) {
            console.log("")
        }
    }
};

module.exports = {
    output,
    process
}