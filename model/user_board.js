const db = require("../config/dbConn");

const post_main = (id) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT * FROM board where id = ?', [id], (err, db_data) => {
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

const post_upload = (id, parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('INSERT INTO board(id, title, posting, images) values(?, ?, ?, ?)', [id, parameter.title, parameter.posting, parameter.images], (err, db_data) => {
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

const post_edit = (id, parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('UPDATE board SET title = ?, posting = ? where id = ?', [parameter.title, parameter.posting, id], (err, db_data) => {
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

const post_loading = (id) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT * FROM board where post_id = ?', [id], (err, db_data) => {
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

module.exports = {
    post_main,
    post_upload,
    post_edit,
    post_loading
}