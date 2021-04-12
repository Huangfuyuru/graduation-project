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
    let { name, birthday, identitycard, gender, familyname, tel, comment, address } = req.body;
    var result = await childsM.addChilds({
        name, birthday, identitycard, gender, familyname, tel, comment, address
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
    let { id, name, birthday, identitycard, gender, familyname, tel, comment, address } = req.body;
    var result = await childsM.changeChildsById({
        id, name, birthday, identitycard, gender, familyname, tel, comment, address
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
    const result = await childsM.getAllChilds(req.body);
    if (result !== 1) {
        info = { code: 0, data: result.data, pagetotal: result.pagetotal || '' }
        res.json(info)
    } else {
        info = { code: 1, data: null, pagetotal: null };
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
