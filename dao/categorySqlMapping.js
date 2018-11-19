
// dao/userSqlMapping.js
// CRUD SQL语句
var categories = {

    update:'update people set NAME=?, ROLE=? where ID=?',
    delete: 'delete from people where id=?',
    queryById: 'select * from categories where id=?',
    queryByName: 'select * from categories where name = ? ',
    queryAllRootCategory: 'select * from categories where parentid is null ',
    queryAllSubCategory:'select * from categories where parentid is not null',
    queryAllCategories:'select * from categories',
    queryCategoriesSalesWithDate:'SELECT categories.name AS catName, SUM(ticketlines.units) AS qtys,SUM(ticketlines.price) AS prices,SUM(payments.total) AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) between ? AND ?' +
        ' GROUP BY products.category',
    queryCategoriesProductSalesWithDate:'SELECT products.name AS productName, products.taxcat as taxRate, categories.name AS catName, ticketlines.units AS qtys,ticketlines.price AS prices, payments.total AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) between ? AND ?',
    queryCategoriesSalesWithOneDate:'SELECT categories.name AS catName, SUM(ticketlines.units) AS qtys,SUM(ticketlines.price) AS prices,SUM(payments.total) AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) = DATE(?)' +
        ' GROUP BY products.category',
    queryCategoriesProductSalesWithOneDate:'SELECT products.name AS productName, products.taxcat as taxRate, categories.name AS catName, ticketlines.units AS qtys,ticketlines.price AS prices, payments.total AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) = DATE(?)',
};

module.exports = categories;
//
//
//
//
// 'SELECT payments.payment as paymethod,SUM(total) as total  FROM receipts,tickets,payments  ' +
// 'where tickets.id=receipts.id ' +
// 'AND payments.receipt = receipts.id ' +
// 'AND DATE(receipts.datenew)' +
// 'between DATE_FORMAT(DATE_SUB(?,INTERVAL 7 DAY),"%Y-%m-%d") and ? ' +
// 'GROUP BY payments.payment;',