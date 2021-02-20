const pgdb = require('./connect');

/**
 * 获取所有信息
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function getAllTimes(data) {
    let sql = 'select * from times';
    let ret = await pgdb.query(sql);
    //console.log(ret.rows)
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows;
    }
}



var timesM = {
    getAllTimes
}
module.exports = timesM;
