"use strict";

const db = require("../config/dbConn");

const post_upload = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('INSERT INTO board(title, posting, images) values(?, ?, ?)', [parameter.title, parameter.posting, parameter.images], (err, db_data) => {
            console.log(db_data);
            if (db_data) {
                resolve(db_data);
            }
            else {
                rejects(err);
            }
        })
    })
}

//게시글 수정하기
const post_edit = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('UPDATE board SET title = ?, posting = ?', [parameter.title, parameter.posting], (err, db_data) => {
            console.log(db_data);
            if (db_data) {
                resolve(db_data);
            }
            else {
                rejects(err);
            }
        })
    })
}

//게시글 불러오기

module.exports = {
    post_upload,
    post_edit
}