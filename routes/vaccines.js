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
    let { name, fixedvaccines, company, deadline, count, setdate, batchNumber, isExist, outdate } = req.body;
    var result = await vaccinesM.addVaccines({
        name, fixedvaccines, company, deadline, count, setdate, batchNumber, isExist, outdate
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
    let { name, fixedvaccines, company, deadline, count, setdate, batchNumber, isExist, outdate, id } = req.body;
    var result = await vaccinesM.changeVaccinesById({
        name, fixedvaccines, company, deadline, count, setdate, batchNumber, isExist, outdate, id
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
    const { id, outdate } = req.body;
    var result = await vaccinesM.deleteVaccines({
        id, outdate
    })
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }
})

router.get('/fixedvaccines', async function (req, res) {
    var result = await vaccinesM.getFixedVaccines()

    if (result !== 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }
})



module.exports = router;
