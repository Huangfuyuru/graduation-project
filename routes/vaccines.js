const express = require('express'),
      router = express.Router(),
      qs = require('querystring'),
      url = require('url'),
      bodyParser = require("body-parser");
var {vaccinesM} = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({extended:true}));
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

router.post('/create',async function(req,res){
    console.log('vaccines-create',req.body)
    /*let {name,count,batchNumber,times} = req.body;
    let arr = times.map(item=>item.value);
    times = arr;
    var result = await vaccinesM.addVaccines({
        name,
        count,
        batchNumber,
        times
    })
    if(result == 0){
        info = {code:0,msg:"添加成功",data:result}
        res.json(info)
    }else{
        info = {code:1,msg:"添加失败",data:null};
        res.json(info)
    }
    */
})
router.get('/detail',async function(req,res){
    console.log('/vaccines/detail')
})

module.exports = router;
