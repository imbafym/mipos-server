var moment = require('moment');


var today = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

var payments = {

    queryAll: 'select payments.payment as paymethod , total from payments',
    queryByDate: 'SELECT payments.payment as paymethod, SUM(total) as total ' +
        'FROM receipts, tickets,payments ' +
        'WHERE tickets.id=receipts.id ' +
        'AND payments.receipt = receipts.id ' +
        'AND DATE(receipts.datenew)=DATE(?) GROUP BY payments.payment',
    queryLastSevenDays:
        'SELECT payments.payment as paymethod,SUM(total) as total  FROM receipts,tickets,payments  ' +
        'where tickets.id=receipts.id ' +
        'AND payments.receipt = receipts.id ' +
        'AND DATE(receipts.datenew)' +
        'between DATE_FORMAT(DATE_SUB(?,INTERVAL 7 DAY),"%Y-%m-%d") and ? ' +
        'GROUP BY payments.payment;',
    queryPayMethod:
        'SELECT Distinct(payments.payment) as paymethod ' +
        'FROM payments ',
    queryOneMonth:
        'SELECT payments.payment as paymethod,SUM(total) as total  FROM receipts,tickets,payments  ' +
        'where tickets.id=receipts.id ' +
        'AND payments.receipt = receipts.id ' +
        'AND DATE_FORMAT(receipts.datenew,"%Y-%m") =  ? ' +
        'GROUP BY payments.payment;',
    queryCustomerPayment:
        'SELECT tickets.id, payments.payment as paymethod, total, tickets.ticketid,' +
        '(SELECT customers.name FROM customers WHERE tickets.customer=customers.id) as c_name   ' +
        'FROM receipts, tickets,payments ' +
        'WHERE tickets.id=receipts.id ' +
        'AND payments.receipt = receipts.id' +
        'AND DATE(receipts.datenew)=?',
    test1:
        'SELECT receipts.datenew' +
        ' FROM receipts,payments,tickets ' +
        ' WHERE receipts.id = payments.id ' +
        ' AND tickets.id=receipts.id' +
        ' AND DATE_FORMAT(receipts.datenew,"%Y-%m") = "2018-10";',
    test:
        'SELECT payments.payment as paymethod,SUM(total) as total ' +
        'FROM receipts,tickets,payments  ' +
        'where tickets.id=receipts.id ' +
        'AND payments.receipt = receipts.id ' +
        'AND DATE(receipts.datenew)' +
        'between ? and ? ' +
        'GROUP BY payments.payment;',

};

module.exports = payments;