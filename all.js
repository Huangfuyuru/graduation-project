const express = require('express'),
    app = express(),
    childs = require('./routes/childs'),
    inoculations = require('./routes/inoculations'),
    vaccines = require('./routes/vaccines'),
    users = require('./routes/users'), //登陆
    register = require('./routes/register');  //注册

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//路由模块
app.use('/users', users);
app.use('/register', register);
app.use('/vaccines', vaccines);
app.use('/childs', childs);
app.use('/inoculations', inoculations)
app.listen(3001);



