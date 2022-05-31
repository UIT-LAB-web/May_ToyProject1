const model = require("../model/user_board");

const output = {
    main: async (req, res) => {
        const result = await model.post_main(req.session.user.id);
        console.log(result);
        res.send(result);
    },
    loading: async (req, res) => {
        try {
            console.log(req.params.num)
            const result = await model.post_loading(req.params.num);
            console.log(result);
            res.send(result);
        } catch (err) {
            console.log("로딩 불가");
        }
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
            console.log(parameter)
            const result = await model.post_upload(req.session.user.id, parameter);
            console.log(result);
            res.send("main");
        } catch (err) {
            console.log("게시 오류");
            res.send("board");
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
            res.send("main");
        } catch (err) {
            console.log("수정 오류");
            res.send("edit");
        }
    },
    delete: async (req, res) => {
        try {
            const result = await model.post_delete(req.params.num);
            console.log(result);
            res.send(result);
        } catch (err) {
            console.log("삭제 불가");
            res.send("loading");
        }
    }
};

module.exports = {
    output,
    process
}