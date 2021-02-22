const pgdb = require('./connect');

/**
 * 获取所有信息
 * 如果增加成功，返回0
 * 增加不成功，返回1a
 * @param {Object} person 
 */
async function getAllChilds(data) {
    const { pageIndex, pageSize, name } = data;
    let sql, ret;
    if (name === '') {
        sql = 'select * from childs limit $1 offset $2';
        ret = await pgdb.query(sql, [pageSize, pageIndex]);
    } else {
        sql = 'select * from childs limit $1 offset $2 where name = $3';
        ret = await pgdb.query(sql, [pageSize, pageIndex, name]);
    }
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows;
    }
}

/**
 * 增加接种者
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addChilds(data) {
    let { name, account, pass, tel, unit, type } = data;
    let sql = 'insert into childs(name, account, pass, tel, unit, type) values($1,$2,$3,$4,$5,$6)';
    let ret = await pgdb.query(sql, [name, account, pass, tel, unit, type]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * 编辑接种者
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function changeChildsById(data) {
    let { id, name, account, pass, tel, unit, type } = data;
    let sql = 'update childs set name = $1,account = $2,pass=$3,tel=$4,unit=$5,type=$6 where id = $7';
    let ret = await pgdb.query(sql, [name, account, pass, tel, unit, type, id]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 * 删除接种者
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function deleteChilds(id) {
    let sql = 'delete from childs where id=$1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}



var childsM = {
    getAllChilds, addChilds, changeChildsById, deleteChilds
}
module.exports = childsM;
