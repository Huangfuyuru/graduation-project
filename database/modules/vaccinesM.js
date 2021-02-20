const pgdb = require('./connect');

/**
 * 增加疫苗
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addVaccines(data) {
    let { name, count, batchNumber, times } = data;
    let sql = 'insert into vaccines(name,count,batchNumber,times) values($1,$2,$3.$4)';
    let ret = await pgdb.query(sql, [name, count, batchNumber, times]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * 获取所有疫苗信息
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function getAllVaccines(data) {
    const { pageIndex, pageSize, name } = data;
    let sql, ret;
    if (name === '') {
        sql = 'select * from vaccines limit $1 offset $2';
        ret = await pgdb.query(sql, [pageSize, pageIndex]);
    } else {
        sql = 'select * from vaccines limit $1 offset $2 where name = $3';
        ret = await pgdb.query(sql, [pageSize, pageIndex]);
    }
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows;
    }
}

/**
 * 删除疫苗
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function deleteVaccines(data) {
    let { id } = data;
    let sql = 'delete from vaccines where id=$1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 *根据id修改疫苗信息
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeVaccinesById(data, id) {
    let { name, count, batchNumber, times } = data;
    let sql = 'update vaccines set name = $1,count=$2,batchNumber=$3,times=$4 where id = $5'
    let ret = await pgdb.query(sql, [name, count, batchNumber, times, id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0;
    }
}

var vaccinesM = {
    addVaccines, getAllVaccines, deleteVaccines, changeVaccinesById
}
module.exports = vaccinesM;
