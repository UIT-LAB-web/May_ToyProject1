"use strict";

const nodemailer = require('nodemailer');

const send_temporary_pw = (parameter) => {
    return new Promise((resolve, reject) => {
        let variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(","); 
        let randomPassword = createRandomPassword(variable, 8);
        function createRandomPassword(variable, passwordLength) { 
            let randomString = ""; 
            for (let j=0; j<passwordLength; j++) 
            randomString += variable[Math.floor(Math.random()*variable.length)];
            return randomString;
        };
        const transporter = nodemailer.createTransport({ 
            service: 'gmail',
            auth: {
                user: "20201012@vision.hoseo.edu",
                pass: "nskyrfzukrxsswrq"
            }
        });
        const mailOptions = {
            from: "20201012@vision.hoseo.edu",
            to: parameter.toEmail,
            subject: parameter.subject,
            text: "Temporary Password: " + randomPassword
        };
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
            reject(err);
            } else {
            console.log(mailOptions);
            resolve(mailOptions);
            }
        });
    });
}

const send_id = (parameter) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "20201012@vision.hoseo.edu",
                pass: "nskyrfzukrxsswrq"
            }
        });
        const mailOptions = {
            from: "20201012@vision.hoseo.edu",
            to: parameter.toEmail,
            subject: parameter.subject,
            text: parameter.text
        };
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
            reject(err);
            } else {
            console.log(mailOptions);
            resolve(mailOptions);
            }
        });
    });
}

module.exports = {
    send_id,
    send_temporary_pw
}