const pgdb = require('./connect');

/**
 * 增加疫苗
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addVaccines(data) {
    let { name, fixedvaccinesid, company, deadline, count, setdate, batchnumber,isexist } = data;
    let sql = 'insert into vaccines(name, fixedvaccinesid, company, deadline, count, setdate, batchnumber,isexist) values($1,$2,$3,$4,$5,$6,$7,$8)';
    let ret = await pgdb.query(sql, [name, fixedvaccinesid, company, deadline, count, setdate, batchnumber,isexist]);
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
    let { pageindex = 0, pagesize = 0, name = '', fixedvaccinesid = '' } = data;
    pageindex = Number(pageindex);
    pagesize = Number(pagesize);
    pageindex = pagesize * (pageindex - 1);
    let sql, ret, sql1, ret1;
    if (fixedvaccinesid) {
        sql = 'select * from vaccines where fixedvaccinesid = $1';
        ret = await pgdb.query(sql, [fixedvaccinesid]);
    } else {
        if (name === '') {
            sql = 'select * from vaccines order by isexist asc limit $1 offset $2';
            sql1 = 'select count(*) from vaccines where isexist=true';
            ret = await pgdb.query(sql, [pagesize, pageindex]);
            ret1 = await pgdb.query(sql1);
        } else {
            sql = 'select * from vaccines where name =$1 and isexist = true order by id limit $2 offset $3';
            sql1 = 'select count(*) from vaccines where name = $1 and isexist=true';
            ret = await pgdb.query(sql, [name, pagesize, pageindex]);
            ret1 = await pgdb.query(sql1, [name]);
        }
    }

    if (ret.rowCount <= 0) {
        return 1;
    } else {
        if (fixedvaccinesid) {
            return { data: ret.rows };
        }
        return { data: ret.rows, pagetotal: ret1.rows[0].count };
    }
}
async function getOneVaccines(data){
  let {id} = data;
  let sql = 'select * from vaccines where id=$1';
  let ret = await pgdb.query(sql,[id]);
  if(ret.rowCount<=0){
    return 1
  }else{
    return ret.rows[0]
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
    let sql = 'update vaccines set isexist=false,outdate = $1 where id = $2';
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
    let { name, fixedvaccinesid, company, deadline, count, setdate, batchnumber, id } = data;
    let sql = 'update vaccines set name=$1,fixedvaccinesid=$2,company=$3,deadline=$4,count=$5,setdate=$6,batchnumber=$7 where id = $8'
    let ret = await pgdb.query(sql, [name, fixedvaccinesid, company, deadline, count, setdate, batchnumber, id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0;
    }
}

/**
 * 获得count
 * 不存在返回null,存在返回用户数据
 * @param {string} account 
 * @param {string} pass
 * @return {Object} 是一个对象，具体参数参照数据表  
 */

async function getCount(account, pass) {
    let sqlUsers = 'select count(*) from users';
    let sqlVaccines = 'select count(*) from vaccines';
    let sqlChilds = 'select count(*) from childs';
    let retUsers = await pgdb.query(sqlUsers);
    let retVaccines = await pgdb.query(sqlVaccines);
    let retChilds = await pgdb.query(sqlChilds);
    let d = {
        users: retUsers.rows[0].count,
        childs: retChilds.rows[0].count,
        vaccines: retVaccines.rows[0].count
    }
    return d

}
var vaccinesM = {
    addVaccines, getAllVaccines, deleteVaccines, changeVaccinesById, getFixedVaccines, getCount,getOneVaccines
}
module.exports = vaccinesM;
