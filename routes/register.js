//注册后台
var express = require('express');
var router = express.Router();
var qs = require('querystring');
var url = require('url');
var bodyParser = require("body-parser");
var { userM } = require('../database/dateMethod');
var createCode = require('./nodemailer/tools');
var nodemail = require('./nodemailer/nodemailer')
var info = { code: 1, msg: "请输入验证码" } //后端返回给前端的信息
var tcode = "";
var time = "";

//此中间件的作用是获得请求体字符串，然后转成对象赋值给req.body
router.use(bodyParser.urlencoded({ extended: true }));
//判断请求体的格式是不是json格式，如果是的话会调用JSON.parse方法把请求体字符串转成对象
router.use(bodyParser.json());


//发送验证码

router.post('/code', async function (req, res, next) {
    var code = createCode();
    //查看是否注册过，可注册：0；不可：1
    var result = await userM.findaccount(req.body.account);
    if (result === 0) {
        info = {
            code: 0,
            msg: '验证码已发送'
        }
        var mail = {
            from: '864134710@qq.com.com',
            subject: '疫苗接种管理系统验证码',
            to: req.body.email,
            text: '【疫苗接种管理系统】验证码: ' + code + ',您当前正在注册记得,十分钟内有效，请勿泄露给他人。'
        }
        tcode = code;
        time = (new Date()).getTime();
        await nodemail(mail);
    } else {
        info = {
            code: 1,
            msg: '该邮箱已注册过'
        }
    }
    res.json(info);
})

//点击注册
router.post('/create', async function (req, res, next) {
    const { name, account, pass, type, unit, tel, confirmcode } = req.body;
    const result = await userM.findaccount(account);
    if (result === 0) {
        var now = (new Date()).getTime();
        if (confirmcode == tcode && now - time <= 600000) {
            const person = {
                name, account, pass, type, unit, tel
            };
            const add = await userM.addUser(person);
            if (add === 0) {
                info = {
                    code: 0,
                    msg: "注册成功"
                }
            }
        } else {
            if (confirmcode != tcode) {
                info = {
                    code: 1,
                    msg: "验证码错误"
                }
            } else if (now - time > 60000) {
                info = {
                    code: 2,
                    msg: "验证码已失效"
                }
            }
        }
    } else {
        info = {
            code: 3,
            msg: '该邮箱已注册过'
        }
    }
    res.json(info);
});


module.exports = router;
