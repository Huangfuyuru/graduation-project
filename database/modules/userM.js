const pgdb = require('./connect');

async function login(account, pass) {
    let sql = 'select * from users where account = $1 and pass = $2';
    let ret = await pgdb.query(sql, [account, pass]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return ret.rows[0];
    }
}

async function findaccount(account) {
    let sql = 'select * from users where account = $1';
    let ret = await pgdb.query(sql, [account]);
    if (ret.rowCount <= 0) {
        return 0
    } else {
        return 1
    }
}

/**
 * 增加用户 前提是用户没有注册，也就是说数据库中没有这个account
 * 如果增加成功，返回0
 * 增加不成功，返回1
 * @param {Object} person 
 */
async function addUser(person) {
    const { name, account, pass, type, unit } = person;
    let sql = 'insert into users(name,account,pass,type,unit,tel) values($1,$2,$3,$4,$5,$6)';
    let ret = await pgdb.query(sql, [name, account, pass, type, unit, tel]);
    if (ret.rowCount <= 0) {
        return 1;
    } else {
        return 0;
    }
}

/**
 *
 * 根据account 删除用户
 * @param {String} account
 * @returns
 */
async function delUser(account) {
    let sql = 'delete from users where account = $1';
    let ret = await pgdb.query(sql, [account]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0
    }
}

/**
 *根据account查找用户id
 *
 * @param {String} account
 * @returns
 */
async function findIdByaccount(account) {
    let sql = 'select uid from users where account = $1';
    let ret = await pgdb.query(sql, [account]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows[0]
    }
}

/**
 *根据id查找account
 *
 * @param {String} id
 * @returns
 */
async function findaccountById(id) {
    let sql = 'select account from users where id = $1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows[0]
    }
}

/**
 *查看所有用户信息
 *
 * @returns 所有用户信息
 */
async function findAll() {
    let sql = 'select * from users';
    let ret = await pgdb.query(sql);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows;
    }
}

/**
 *根据id修改用户信息
 传入要修改的用户id,以及要修改的内容
 注意id类的都不能修改,所以text中可以没有id
 setdate类不用修改，所有text中可以没有setdate字段
 有些内容不需要修改，但是要传入原内容  看函数中的字段
 *
 * @param {int} id
 * @param {Object} text
 * @returns
 */
async function changeById(text, id) {
    let sql = 'update users set name = $1,pass=$2,gender=$3 where id = $4'
    let ret = await pgdb.query(sql, [text.name, text.pass, text.gender, id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0;
    }
}

async function findById(id) {
    let sql = 'select * from users where id = $1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows[0]
    }
}
//新增加入 num 签到
async function changeNum(id) {
    let sql = 'update users set num = num+1 where id = $1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows[0]
    }
}

//更改头像
async function changeImgById(id, imgurl) {
    let sql = 'update users set imgurl = $1 where id = $2';
    let ret = await pgdb.query(sql, [imgurl, id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0
    }
}
var userM = {
    login, findaccount, addUser, delUser, findIdByaccount, findaccountById, findAll, changeById, findById, changeNum, changeImgById
}
module.exports = userM;
