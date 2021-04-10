//发送邮件的配置信息
const nodemailer = require('nodemailer');

const config = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
        user: '864134710@qq.com',
        pass: '15930300511hf'
    }
};

const transporter = nodemailer.createTransport(config);

module.exports = function (mail) {
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        }
        console.log('mail sent', info.response);
    });
};

