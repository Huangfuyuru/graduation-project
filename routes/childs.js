const express = require('express'),
    router = express.Router(),
    qs = require('querystring'),
    url = require('url'),
    bodyParser = require("body-parser");
var { childsM } = require('../database/dateMethod')

//配置bodyparser中间件
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/create', async function (req, res) {
    let { name, account, pass, tel, unit, type } = req.body;
    var result = await childsM.addChilds({
        name, account, pass, tel, unit, type
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
    let { id, name, account, pass, tel, unit, type } = req.body;
    var result = await childsM.changeChildsById({
        id, name, account, pass, tel, unit, type
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
    const { pageIndex, pageSize, name = '' } = req.body;
    var result = await childsM.getAllChilds({
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
    var result = await childsM.deleteChilds(id)
    if (result == 0) {
        info = { code: 0, data: result }
        res.json(info)
    } else {
        info = { code: 1, data: null };
        res.json(info)
    }
})

module.exports = router;
