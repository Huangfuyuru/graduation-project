const express = require('express'),
    router = express.Router(),
    qs = require('querystring'),
    url = require('url'),
    bodyParser = require("body-parser");
var { timesM } = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// router.post('/',async function(req,res,next){
//     var uid = Number(req.body.uid);
//     var data = await childM.findIdByUid(uid);
//     let message = {};
//     if(data === 1){
//         message = {code:0,msg:null}
//     }else{
//         message = {code:1,msg:data}
//     }
//     res.json(message);
// })

router.get('/detail', async function (req, res) {
    var result = await timesM.getAllTimes()
    if (result !== 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }
})


module.exports = router;
