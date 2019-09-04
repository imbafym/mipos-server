
// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert: 'INSERT INTO people(id, name,role) VALUES(7,?,?)',
    update: 'update people set NAME=?, ROLE=? where ID=?',
    delete: 'delete from people where id=?',
    queryById: 'select * from people where id=?',
    queryAll: 'select * from people',
    login: 'select * from people where name=?',
    getBusinessName: 'select BUSINESS_NAME from config',
    getCustomer: 'select id, name from customers',
    //==========================Customer info==========================
    queryCustomerInfo:
        'select  c.id, c.name, phone as mobile, email, address, address2, city, postal as postcode, v.name as groups, curpoints as  points, curdebt as debt, notes as note' +
        ' from customers c, vip_groups v' +
        ' where v.ID = c.vip_group;',
    getUsers: 'SELECT  ID as userId, Name as userName FROM people',
    queryUserShifts:
        'select s.pplid as id,  p.name, s.startshift as startTime, s.ENDSHIFT as endTime, Date(s.startshift) as startDate, Date(s.endShift) as endDate, (UNIX_TIMESTAMP(s.ENDSHIFT) -UNIX_TIMESTAMP( s.startshift))/3600 as hours ' +
        ' from shifts s, people p where p.id = s.pplid' +
        ' and Date(s.startshift)  >= ?' +
        ' and Date(s.endShift) <= ?',
};

module.exports = user;