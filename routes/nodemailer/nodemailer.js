//发送邮件的配置信息
const nodemailer = require('nodemailer');

const config = {
    host:'smtp.qq.com',
    secureConnection:true,
    port: 465,
    auth: {
        user: '864134710@qq.com',
        pass: 'jwiwejvmpflrbfec'
    }
};

const transporter = nodemailer.createTransport(config);
module.exports = function (mail) {
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log('err',err);
        }
        console.log('mail sent', info.response);
    });
};

