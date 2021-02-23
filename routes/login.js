const express = require('express'),
    router = express.Router(),
    bodyParser = require("body-parser");
const { userM } = require("../database/dateMethod");//引入数据库
const fs = require('fs');
//配置bodyparser中间件
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/users', async function (req, res, next) {
    let { account, pass } = req.body;
    var getUser = await userM.findeaccount(account);
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
})

//测试
// router.get('/',function(req,res,next){ 
//     var fileContent = fs.readFileSync(`E:\\fight_blink\\wechat-group\\back-end\\app-hf.html`);
//     res.writeHead(200, {"Content-Type":"text/html"});
//     res.end(fileContent);
// })

module.exports = router;



