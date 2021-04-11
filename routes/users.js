const express = require('express'),
    router = express.Router(),
    bodyParser = require("body-parser");
const { userM } = require("../database/dateMethod");//引入数据库
const fs = require('fs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/login', async function (req, res) {
    let { account, pass } = req.body;
    var getUser = await userM.findaccount(account);
    if (getUser == 0) {
        var message = { code: 1, data: null, msg: "该账号未注册，请先注册" }
    } else {
        var realdata = await userM.login(account, pass);
        if (realdata == 1) {
            var message = { code: 1, data: null, msg: "邮箱或密码有误" }
        } else {
            var message = { code: 0, data: realdata, msg: '欢迎使用记得' }
        }
    }
    res.json(message)
});

router.post('/delete', async function (req, res) {
    const { id } = req.body;
    const result = await userM.delUser(id);
    const message = {};
    if (result) {
        message = {
            code: 1,
            msg: '删除失败'
        }
    } else {
        message = {
            code: 0,
            msg: '删除成功'
        }
    }
    res.json(message)
});

router.post('/modify', async function (req, res) {
    const result = await userM.changeById(req.body);
    const message = {};
    if (result) {
        message = {
            code: 1,
            msg: '修改失败'
        }
    } else {
        message = {
            code: 0,
            msg: '修改成功'
        }
    }
    res.json(message)
})

module.exports = router;



