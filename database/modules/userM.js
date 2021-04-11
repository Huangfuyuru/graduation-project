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

async function delUser(id) {
    let sql = 'delete from users where id = $1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return 0
    }
}

async function findIdByaccount(account) {
    let sql = 'select uid from users where account = $1';
    let ret = await pgdb.query(sql, [account]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows[0]
    }
}

async function findaccountById(id) {
    let sql = 'select account from users where id = $1';
    let ret = await pgdb.query(sql, [id]);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows[0]
    }
}

async function findAll() {
    let sql = 'select * from users';
    let ret = await pgdb.query(sql);
    if (ret.rowCount <= 0) {
        return 1
    } else {
        return ret.rows;
    }
}

async function changeById(params) {
    const { name, pass, type, unit, tel, id } = params;
    let sql = 'update users set name = $1,pass=$2,unit=$3,tel=$4,type=$5 where id = $6'
    let ret = await pgdb.query(sql, [name, pass, unit, tel, type, id]);
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

var userM = {
    login, findaccount, addUser, delUser, findIdByaccount, findaccountById, findAll, changeById, findById,
}
module.exports = userM;
