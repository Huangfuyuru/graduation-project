const pgdb = require('./connect');

/**
 * 增加疫苗
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addVaccines(data) {
    let { name, fixedvaccinesid, company, deadline, count, setdate, batchNumber} = data;
    let sql = 'insert into vaccines(name, fixedvaccinesid, company, deadline, count, setdate, batchNumber) values($1,$2,$3,$4,$5,$6,$7)';
    let ret = await pgdb.query(sql, [name, fixedvaccinesid, company, deadline, count, setdate, batchNumber]);
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
 * 获取所有固定疫苗信息
 * @param {Object} person 
 */
async function getFixedVaccines() {
    let sql = 'select * from fixedvaccines';
    let ret = await pgdb.query(sql);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows;
    }
}

/**
 * 下架疫苗
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function deleteVaccines(data) {
    let { id, outdate } = data;
    let sql = 'update vaccines set isExist=false,outdate = $1 where id = $2';
    let ret = await pgdb.query(sql, [outdate, id]);
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
async function changeVaccinesById(data) {
    let { name, fixedvaccinesid, company, deadline, count, setdate, batchNumber, id } = data;
    let sql = 'update vaccines set name=$1,fixedvaccinesid=$2,company=$3,deadline=$4,count=$5,setdate=$6,batchNumber=$7 where id = $6'
    let ret = await pgdb.query(sql, [name, fixedvaccinesid, company, deadline, count, setdate, batchNumber, id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0;
    }
}

var vaccinesM = {
    addVaccines, getAllVaccines, deleteVaccines, changeVaccinesById, getFixedVaccines
}
module.exports = vaccinesM;
