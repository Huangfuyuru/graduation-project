const pgdb = require('./connect');

/**
 * 获取所有信息
 * 如果增加成功，返回0
 * 增加不成功，返回1a
 * @param {Object} person 
 */
async function getAllInoculations(data) {
    const { pageIndex, pageSize, childsname, vaccinesname } = data;
    let sql = 'select * from inoculations limit $1 offset $2 where ';
    let ret = await pgdb.query(sql, [pageSize, pageIndex, name]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows;
    }
}

/**
 * 增加接种信息
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addInoculations(data) {
    let { childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate } = data;
    let sql = 'insert into inoculations(childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate) values($1,$2,$3,$4,$5,$6)';
    let ret = await pgdb.query(sql, [childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * 编辑接种信息
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function changeInoculationsById(data) {
    let { childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate, id } = data;
    let sql = 'update childs set childsid=$1,childname=$2,vaccinesname=$3,vaccinesid=$4,ordinal=$5,inoculatedate=$6 where id = $7';
    let ret = await pgdb.query(sql, [childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate, id]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * 删除接种信息
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function deleteInoculations(id) {
    let sql = 'delete from inoculations where id=$1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * 根据接种者id获得所有接种信息
 * 如果增加成功，返回0
 * 增加不成功，返回1a
 * @param {Object} person 
 */
async function getAllByChildsId(id) {
    let sql = 'select * from inoculations where childsid = $3';
    let ret = await pgdb.query(sql, [pageSize, pageIndex, childsid]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows;
    }
}



var childsM = {
    addInoculations, changeInoculationsById, deleteInoculations, getAllByChildsId
}
module.exports = childsM;
