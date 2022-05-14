"use strict";

const db = require('../config/dbConn');

const signup_data = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT * FROM member where id = ?', [parameter.id], (err, db_data) => {
            console.log(db_data)
            if (db_data.length == 0) {
                console.log(db_data)
                db.query('INSERT INTO member(name, email, id, pw, salt) values(?,?,?,?,?)', [parameter.name, parameter.email, parameter.id, parameter.pw, parameter.salt]);
                resolve(db_data);
            }
            else {
                rejects(err);
            }
        })
    })
}

const login_data = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT pw, salt FROM member where id = ?', [parameter.id], (err, db_data) => {
            if(db_data){
                resolve(db_data);
            }
            else {
                rejects(err);
            }
        })
    })
}

const find_id = (parameter) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM member where email = ?', [parameter.email], (err, db_data) => {
            if(db_data) {
                resolve(db_data);
            }
            else {
                reject(err);
            }
        })
    })
}

const chang_pw = (parameter) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE member SET pw = ?, salt = ? where id = ?',[parameter.pw, parameter.salt, parameter.id], (err, db_data) => {
            if(db_data) {
                resolve(db_data);
            }
            else {
                reject(err);
            }
        })
    })
}

module.exports = {
    signup_data,
    login_data,
    find_id,
    chang_pw
}