const pgdb = require('./connect');

/**
 * 获取所有信息
 * 如果增加成功，返回0
 * 增加不成功，返回1a
 * @param {Object} person 
 */
async function getAllChilds(data) {
    let { pageindex = 0, pagesize = 0, name = '', identitycard='' } = data;
    pagesize = Number(pagesize);
    pageindex = Number(pageindex);
    pageindex = pagesize * (pageindex - 1);
    let sql, sql1, ret, ret1;
    if (identitycard !== '') {
        sql = 'select * from childs where identitycard = $1';
        ret = await pgdb.query(sql, [identitycard]);
    } else {
        if (name === '') {
            sql = 'select * from childs order by id limit $1 offset $2';
            sql1 = 'select count(*) from childs';
            ret = await pgdb.query(sql, [pagesize, pageindex]);
            ret1 = await pgdb.query(sql1);
        } else {
            sql = 'select * from childs where name = $1 order by id limit $2 offset $3';
            ret = await pgdb.query(sql, [name, pagesize, pageindex]);
            sql1 = 'select count(*) from childs where name=$1';
            ret1 = await pgdb.query(sql1, [name]);
        }
    }
    //console.log(pagesize,pageindex,name,identitycard)
    //console.log(ret.rows)
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
 * 增加接种者
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addChilds(data) {
    let { name, birthday, identitycard, gender, familyname, tel, comment, address } = data;

    let sql = 'insert into childs(name,birthday,identitycard,gender,familyname,tel,comment,address) values($1,$2,$3,$4,$5,$6,$7,$8)';
    let ret = await pgdb.query(sql, [name, birthday, identitycard, gender, familyname, tel, comment, address]);
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
    let { id, name, birthday, identitycard, gender, familyname, tel, comment, address } = data;
    let sql = 'update childs set name = $1,birthday=$2,identitycard=$3,gender=$4,familyname=$5,tel=$6,comment=$7,address=$8 where id = $9';
    let ret = await pgdb.query(sql, [name, birthday, identitycard, gender, familyname, tel, comment, address, id]);
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
    id = String(id);
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
