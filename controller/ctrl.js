"use strict";

const model = require("../model/user");
const bkfd2Password = require('../middlewares/pbk');
const find = require("../middlewares/find");
log("ttttttttttttt")

const output = {
    main: (req, res) => {
        if(req.session.is_login == true){
            res.render("main", {
                is_login: req.session.is_login,
                name: req.session.name
            });
        } else{
            res.render("main", {
                is_login: false
            });
        }
    },
    login: (req, res) => {
        res.render("login");
    },
    signup: (req, res) => {
        res.render("signup");
    },
    logout: (req, res) => {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect("/");
        })
    },
    find: (req, res) => {
        res.render("find");
    },
    find_id: (req, res) => {
        res.render("find_id");
    },
    find_pw: (req, res) => {
        res.render("find_pw");
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
            const hash = result[0].pw;
            const salt = result[0].salt;
            const pbk = await bkfd2Password.decryption(parameter.pw, salt, hash);
            console.log(pbk);
            req.session.save(function() {
                res.render("main",{
                    output:result[0],
                    user:result[0], 
                    is_login:true});
            });
        } catch (err) {
            console.log("로그인 실패");
            res.render("login");
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
                res.redirect("/");
            } else {
                console.log("비밀번호가 다릅니다.");
            }
        } catch (err) {
            console.log("회원가입 실패")
            res.redirect("/login");
            throw err;
        }
    },
    find_id: async (req, res) => {
        try {
            const parameter = {
                "email": req.body.email
            };
            const get_id = await model.find_id(parameter);
            console.log(get_id);
            const emailParameter = {
                toEmail: parameter.email,
                subject: "Find your Id",
                text: "Yout ID: " + get_id
            };
            await find.find_id(emailParameter);
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
            await find.find_pw(emailParameter);
            res.status(200).send("이메일 발송 완료");
            //메일로 보낸 암호를 암호화해서 유저 디비에 넣기


        } catch (err) {
            console.log("아이디 혹은 이메일이 다릅니다");
            throw err;
        }
    },
    change_pw: async (req, res) => {
        try {
            //임시 비밀번호, 새 비밀번호, 비밀번호 확인
            const parameter = {
                "temporary_pw": req.body.pw,
                "new_pw": req.body.new_pw,
                "new_pw_check" :req.body.new_pw_check
            };
            //if 유저 디비에 있는 값과 입력한 임시비번이 같은지
            if(model.signup_data.pw == parameter.temporary_pw) {
                //if 새 비번과 비번확인이 같은지
                if(parameter.new_pw == parameter.new_pw_check) {
                    //새 비번을 유저 디비에 업데이트
                }
                else {
                    console.log("비밀번호 다름");
                }
            }
            else {
                console.log("임시 비밀번호 틀림");
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