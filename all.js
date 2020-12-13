const express = require('express'),
      app = express(),
      login = require('./routes/login'), //登陆
      resign =require('./routes/register')  //注册
      
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');  
    res.header('Access-Control-Allow-Methods', '*');  
    res.header('Content-Type', 'application/json;charset=utf-8');   
    next();
});

//路由模块
app.use('/login',login);
app.use('/resign',resign);
app.listen(3001);


    
