const express = require('express'),
    router = express.Router(),
    qs = require('querystring'),
    url = require('url'),
    bodyParser = require("body-parser");
var { inoculationsM } = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/create', async function (req, res) {
    var result = await inoculationsM.addInoculations(req.body)
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }

})
router.post('/modify', async function (req, res) {
    let { childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate, id, zz } = req.body;
    var result = await inoculationsM.changeInoculationsById({
        childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate, id, zz
    })
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }

})
router.post('/detail', async function (req, res) {
  console.log(req.body)
    var result = await inoculationsM.getAllInoculations(req.body)
    if (result == 1) {
        info = { code: 1, data: null }
        res.json(info)
    } else {
        info = { code: 0, ...result };
        res.json(info)
    }
})

router.post('/delete', async function (req, res) {
    const { id } = req.body;
    var result = await inoculationsM.deleteInoculations({
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
