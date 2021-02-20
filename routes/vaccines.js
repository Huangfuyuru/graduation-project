const express = require('express'),
    router = express.Router(),
    qs = require('querystring'),
    url = require('url'),
    bodyParser = require("body-parser");
var { vaccinesM } = require('../database/dateMethod')

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

router.post('/create', async function (req, res) {
    let { name, count, batchNumber, times,type } = req.body;
    var result = await vaccinesM.addVaccines({
        name,
        count,
        batchNumber,
        times,
        type
    })
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }

})
router.post('/modify', async function (req, res) {
    let { name, count, batchNumber, times, id,type } = req.body;
    var result = await vaccinesM.changeVaccinesById({
        name,
        count,
        batchNumber,
        times,
        id,
        type
    })
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }

})
router.get('/detail', async function (req, res) {
    const { pageIndex, pageSize, name = '' } = req.body;
    var result = await vaccinesM.getAllVaccines({
        pageIndex,
        pageSize,
        name
    })
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }
})

router.post('/delete', async function (req, res) {
    const { id } = req.body;
    var result = await vaccinesM.deleteVaccines({
        id
    })
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }
})



module.exports = router;
