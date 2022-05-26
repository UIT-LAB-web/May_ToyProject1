"use strict";

const model = require("../model/user");
const bkfd2Password = require('../middlewares/pbk');
const find = require("../middlewares/find");

const output = {
    main: (req, res) => {
        if(req.session.is_login == true){
            res.send("main", {
                is_login: req.session.is_login,
                name: req.session.name
            });
        } else{
            res.send("main", {
                is_login: false
            });
        }
    },
    login: (req, res) => {
        res.send("login");
    },
    signup: (req, res) => {
        res.send("signup");
    },
    logout: (req, res) => {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.send("/");
        })
    },
    find: (req, res) => {
        res.send("find");
    },
    find_id: (req, res) => {
        res.send("find_id");
    },
    find_pw: (req, res) => {
        res.send("find_pw");
    }
};

const process = {
    login: async (req, res) => {
        try {
            const parameter = {
                "id": req.body.id,
                "pw": req.body.pw
            };
            const result = await model.login_data(parameter);
            console.log(result)
            const hash = result[0].pw;
            const salt = result[0].salt;
            const pbk = await bkfd2Password.decryption(parameter.pw, salt, hash);
            console.log(pbk);
            req.session.user = { id: parameter.id }
            res.send("main");
            console.log(req.session.user.id)
            console.log(req.session)
        } catch (err) {
            console.log("로그인 실패");
            res.send("login");
        };
    },
    signup: async (req, res) => {
        try {
            const parameter = {
                "name": req.body.name,
                "email": req.body.email,
                "id": req.body.id,
                "pw": req.body.pw,
                "pw_check": req.body.pw_check
            };
            if (parameter.pw == parameter.pw_check) {
                const pbk = await bkfd2Password.encryption(parameter);
                console.log(pbk);
                parameter.pw = pbk.hash;
                parameter.salt = pbk.salt;
                const result = await model.signup_data(parameter);
                console.log(result);
                res.send("login");
            } else {
                console.log("비밀번호가 다릅니다.");
            }
        } catch (err) {
            console.log("회원가입 실패");
            res.send("signup");
            throw err;
        }
    },
    find_id: async (req, res) => {
        try {
            const parameter = {
                "email": req.body.email
            };
            const get_id = await model.find_id_data(parameter);
            console.log(get_id);
            const get_id_ = JSON.stringify(get_id);
            const get_id__ = get_id_.slice(8, get_id_.length-3);
            const emailParameter = {
                toEmail: parameter.email,
                subject: "Find your Id",
                text: "Your ID: " + get_id__
            };
            await find.send_id(emailParameter);
            res.status(200).send("이메일 발송 완료");
        } catch (err) {
            console.log("아이디 찾기 실패");
            throw err;
        }
    },
    find_pw: async (req, res) => {
        try {
            const parameter = {
                "id": req.body.id,
                "email": req.body.email
            };
            const emailParameter = {
                toEmail: parameter.email,
                subject: "Temporary Password"
            };
            const get_pw = await find.send_temporary_pw(emailParameter);
            res.status(200).send("이메일 발송 완료");
            parameter.pw = get_pw.text.slice(20, 29);
            const pbk = await bkfd2Password.encryption(parameter);
            console.log(pbk);
            parameter.pw = pbk.hash;
            parameter.salt = pbk.salt;
            const result = await model.change_pw_data(parameter);
            console.log(result);
        } catch (err) {
            console.log("아이디 혹은 이메일이 다릅니다");
            throw err;
        }
    },
    change_pw: async (req, res) => {
        try {
            const parameter = {
                "id": req.body.id,
                "pw": req.body.pw,
                "new_pw": req.body.new_pw,
                "new_pw_check" :req.body.new_pw_check
            };
            const result = await model.login_data(parameter);
            const hash = result[0].pw;
            const salt = result[0].salt;
            const pbk = await bkfd2Password.decryption(parameter.pw, salt, hash);
            console.log(pbk);
            if(parameter.new_pw == parameter.new_pw_check) {
                parameter.pw = parameter.new_pw;
                const result = await model.change_pw_data(parameter);
                console.log(result);
            }
            else {
                console.log("비밀번호 다름");
            }
        } catch(err) {
            console.log("비밀번호 틀림");
            throw err;
        }
    }
};

module.exports = {
    output,
    process,
};