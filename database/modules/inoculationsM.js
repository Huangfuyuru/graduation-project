const pgdb = require('./connect');

/**
 * 获取所有信息
 * 如果增加成功，返回0
 * 增加不成功，返回1a
 * @param {Object} person 
 */
async function getAllInoculations(data) {
    let { pageindex = 0, pagesize = 0, childsname = '' } = data;
    pagesize = Number(pagesize);
    pageindex = Number(pageindex);
    pageindex = pagesize * (pageindex - 1);
    let sql, sql1, ret, ret1;
    if (childsname !== '') {
        sql = 'select * from inoculations where childsname = $1';
        ret = await pgdb.query(sql, [childsname]);
    } else {
        if (childsname === '') {
            sql = 'select * from inoculations order by id limit $1 offset $2';
            sql1 = 'select count(*) from inoculations';
            ret = await pgdb.query(sql, [pagesize, pageindex]);
            ret1 = await pgdb.query(sql1);
        } else {
            sql = 'select * from inoculations where childsname = $1 order by id limit $2 offset $3';
            ret = await pgdb.query(sql, [childsname, pagesize, pageindex]);
            sql1 = 'select count(*) from inoculations where childsname=$1';
            ret1 = await pgdb.query(sql1, [childsname]);
        }
    }

    if (ret.rowCount <= 0) {
        return 1;
    } else {
        if (identitycard !== '') {
            return { data: ret.rows[0] }
        }
        return { data: ret.rows, pagetotal: ret1.rows[0].count };
    }
}

/**
 * 增加接种信息
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addInoculations(data) {
    let { childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate, reaction } = data;
    let sql = 'insert into inoculations(childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate，reaction) values($1,$2,$3,$4,$5,$6,$7)';
    let ret = await pgdb.query(sql, [childsid, childsname, vaccinesname, vaccinesid, ordinal, inoculatedate, reaction]);
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
    addInoculations, changeInoculationsById, deleteInoculations, getAllByChildsId, getAllInoculations
}
module.exports = childsM;
