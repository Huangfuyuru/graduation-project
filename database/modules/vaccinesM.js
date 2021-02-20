const pgdb = require('./connect');

/**
 * 增加用户 前提是用户没有注册，也就是说数据库中没有这个email
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addVaccinesM(data){
    let {name,count,batchNumber,times} = data;
    let sql = 'insert into vaccines(name,count,batchNumber,times) values($1,$2,$3.$4)';
    let ret = await pgdb.query(sql,[name,count,batchNumber,times]);
    if(ret.rowCount<=0){
        return 1;
    }else{
        return 0;
    }
}


var vaccinesM = {
    addVaccinesM
}
module.exports = vaccinesM;
