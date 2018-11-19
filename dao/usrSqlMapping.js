
// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO people(id, name,role) VALUES(7,?,?)',
    update:'update people set NAME=?, ROLE=? where ID=?',
    delete: 'delete from people where id=?',
    queryById: 'select * from people where id=?',
    queryAll: 'select * from people',
    login:'select * from people where name=?'
};

module.exports = user;