
// dao/userSqlMapping.js
// CRUD SQL语句
var categories = {

    update: 'update people set NAME=?, ROLE=? where ID=?',
    delete: 'delete from people where id=?',
    queryById: 'select * from categories where id=?',
    queryByName: 'select * from categories where name = ? ',
    queryAllRootCategory: 'select * from categories where parentid is null ',
    queryAllSubCategory: 'select * from categories where parentid is not null',
    queryAllCategories: 'select * from categories',
    queryCategoriesSalesWithDate: 'SELECT categories.name AS catName, SUM(ticketlines.units) AS qtys,SUM(ticketlines.price) AS prices,SUM(payments.total) AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) between ? AND ?' +
        ' GROUP BY products.category',
    queryCategoriesProductSalesWithDate:
        'SELECT products.name AS productName,products.taxcat as taxRate, categories.name AS catName, ticketlines.units AS qtys,ticketlines.price AS prices, payments.total AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) between ? AND ?',
    queryCategoriesSalesWithOneDate: 'SELECT categories.name AS catName, SUM(ticketlines.units) AS qtys,SUM(ticketlines.price) AS prices,SUM(payments.total) AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) = DATE(?)' +
        ' GROUP BY products.category',
    queryCategoriesProductSalesWithOneDate:
        'SELECT products.name AS productName, products.taxcat as taxRate, categories.name AS catName, ticketlines.units AS qtys,ticketlines.price AS prices, payments.total AS totals ' +
        'FROM receipts, tickets, ticketlines,payments,products, categories' +
        ' WHERE tickets.id=receipts.id AND payments.receipt = receipts.id AND tickets.id=ticketlines.ticket AND products.id=ticketlines.product AND products.category = categories.id AND ' +
        'DATE(receipts.datenew) = DATE(?)',

    //old 
    queryDirectSaleCategoriesProductSalesWithOneDate:
        'SELECT \'Direct Sales\' as productName, t.taxid as taxRate, \'Direct Sales\' AS catName, t.UNITS as qtys, t.PRICE as price' +
        '  FROM  ticketlines as t, receipts  as r' +
        '  WHERE t.ticket = r.ID' +
        ' And t.product is null' +
        ' and Date(r.datenew) = Date(?)',
    //old
    queryDirectSaleCategoriesProductSalesWithOneDateOld:
        'SELECT t.taxid as taxRate, tc.TICKETID as ticketId,p.payment as paytype,c.name as customerName, c.id as customerId,r.datenew as date,p.total as sales' +
        ' FROM  ticketlines as t, receipts  as r, payments as p, tickets as tc, customers as c' +
        ' WHERE t.ticket = r.ID ' +
        ' and t.ticket = tc.id' +
        ' and tc.customer = c.id' +
        ' and p.receipt = t.ticket' +
        ' And t.product is null ' +
        ' and Date(r.datenew) = Date(?)',
        queryDirectSaleCategoriesProductSalesWithOneDate1:
        'SELECT  tc.ticketId as ticketId,' +
        ' p.payment as paytype,pp.name as user, pp.id as userId,r.datenew as date, Round((t.units*t.price*(1+(select rate from taxes where taxes.id = t.taxid))),2) as sales ' +
        ' FROM  ticketlines as t, receipts  as r, payments as p, tickets as tc,  people as pp' +
        ' WHERE t.ticket = r.ID ' +
        ' and t.ticket = tc.id and p.receipt = t.ticket and pp.id = tc.person And t.product is null And Date(r.datenew) = Date(?)',

        //old
    queryDirectSaleCategoriesProductSalesWithDate:
        'SELECT t.taxid as taxRate, tc.TICKETID as ticketId,p.payment as paytype,c.name as customerName,c.id as customerId,r.datenew as date,p.total as sales' +
        ' FROM  ticketlines as t, receipts  as r, payments as p, tickets as tc, customers as c' +
        ' WHERE t.ticket = r.ID ' +
        ' and t.ticket = tc.id' +
        ' and tc.customer = c.id' +
        ' and p.receipt = t.ticket' +
        ' And t.product is null ' +
        ' and Date(r.datenew) between ? AND ?',

    queryDirectSaleCategoriesProductSalesWithDateUpdated:
        'SELECT  tc.ticketId as ticketId, ' +
        ' p.payment as paytype,pp.name as user, pp.id as userId,r.datenew as date, Round((t.units*t.price*(1+(select rate from taxes where taxes.id = t.taxid))),2) as sales ' +
        ' FROM  ticketlines as t, receipts  as r, payments as p, tickets as tc,  people as pp' +
        ' WHERE t.ticket = r.ID ' +
        ' and t.ticket = tc.id and p.receipt = t.ticket and pp.id = tc.person And t.product is null And Date(r.datenew) between ? and ?',

//===================customer Sales=====================================
   queryCustomerSales:
   'select c.name as customerName,c.id as id, sum(round(py.TOTAL,2)) as sale  from customers c, payments py, receipts r, tickets t'+
   ' where t.customer = c.id'+
   ' and r.id = t.id'+
   ' and py.receipt = r.id'+
   ' and py.receipt = t.id'+
   ' and Date(r.datenew) between ? and ?'+ 
   ' group by c.name, c.id;',
//==================User sales========================================
queryUserSales:
'select p.name as userName, p.id as id, sum(round(py.TOTAL,2)) as sale  from people p, payments py, receipts r, tickets t'+
' where t.person = p.id'+
' and r.id = t.id'+
' and py.receipt = r.id'+
' and py.receipt = t.id'+
' and Date(r.datenew) between ? and ?'+ 
' group by p.name, p.id;',

    /////////////////////////////////////////
    queryDeletedItem:
        'SELECT d.datenew as date, d.product_name as productName, d.multiply as qty, Round((d.value* (1+(select rate from taxes where taxes.id = p.taxcat))),2) as sale, d.customer as customer, d.user as user' +
        ' FROM deletedView d, products p' +
        ' where p.id = d.product_id',

    queryFlushDeletedView:
        'DELETE FROM deletedView' +
        ' WHERE DateDiff(CurDate(),Datenew) >30',
    queryFlushDeletedtickets:
        'DELETE FROM deletedtickets' +
        ' WHERE DateDiff(CurDate(),Datenew) >30',
    /////////////////////////////////////////////
    queryProductWithCategoryAndUserAndDiscountwithCustomer:
        'select  p.name as productName, c.NAME as customerName, c.ID as CustomerId , cat.Name as CategoryName, Round( (p.pricesell - tl.PRICE)*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2) as discount, tl.UNITS as qty, Round( tl.price*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2) as sale' +
        ' from tickets t, ticketlines tl, products p, receipts r, categories cat,customers c' +
        ' where  p.category = cat.id' +
        ' and c.id = t.customer' +
        ' and tl.ticket = r.id' +
        ' and t.id = tl.ticket' +
        ' and tl.product = p.id' +
        ' and date(r.datenew) between ? and ?',
        
    queryProductWithCategoryAndUserAndDiscountWithAllCustomer:
    'select p.name as productName, cat.Name as CategoryName, Round( (p.pricesell - tl.PRICE)*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2)  as discount,'+ 
    'tl.UNITS as qty, Round( tl.price*tl.units*(1 + (select rate from taxes where taxes.id = tl.TAXID) ),2)as sale  '+ 

     'from tickets t, ticketlines tl, products p, receipts r, categories cat   '+
     'where  p.category = cat.id   '+
     'and tl.ticket = r.id   '+
     'and t.id = tl.ticket   '+
     'and tl.product = p.id   '+
     'and date(r.datenew) between ?  and ?;',
     queryProductWithCategoryAndUserAndDiscountWithAllCustomer1:

        'select  p.name as productName, cat.Name as CategoryName, Round( (p.pricesell - tl.PRICE)*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2)  as discount, tl.UNITS as qty, Round( tl.price*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2)as sale' +

        ' from tickets t, ticketlines tl, products p, receipts r, categories cat' +
        ' where  p.category = cat.id' +
        ' and tl.ticket = r.id' +
        ' and t.id = tl.ticket' +
        ' and tl.product = p.id' +
        ' and date(r.datenew) between ? and ?',




    queryAllTaxes: 'select taxes.ID as ID, taxes.name as name, taxes.rate as rate, taxes.category as taxCategory from taxes',


    queryTodayHourlyTran1: 'SELECT hour(r.Datenew) as hour,sum(p.total) as total,count(p.TRANSID) as tran, (sum(p.total)/count(p.TRANSID) ) as avg FROM receipts as r,payments as p ' +
        ' where Convert(r.Datenew,date) = curdate() ' +
        ' and p.receipt = r.id ' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by hour(r.Datenew)',
    queryTodayHourlyTran: 'SELECT hour(r.Datenew) as hour,sum(p.total) as total,count(distinct(t.id)) as tran, (sum(p.total)/count(distinct(t.id))) as avg FROM receipts as r,payments as p , tickets as t ' +
        ' where Convert(r.Datenew,date) = curdate() ' +
        ' and p.receipt = r.id ' +
        ' and t.id = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by hour(r.Datenew)',
    queryThisMonthDailyTran1: 'SELECT day(r.Datenew) as day,sum(p.total) as total,count(p.TRANSID) as tran, (sum(p.total)/count(p.TRANSID) ) as avg FROM receipts as r,payments as p ' +
        ' where month(r.Datenew) = Month(curdate())' +
        ' and year(r.Datenew) = Year(curdate())' +
        ' and p.receipt = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by day(r.Datenew);',
    queryThisMonthDailyTran: 'SELECT day(r.Datenew) as day,sum(p.total) as total,count(distinct(t.id)) as tran, (sum(p.total)/count(distinct(t.id))) as avg FROM receipts as r,payments as p, tickets as t ' +
        ' where month(r.Datenew) = Month(curdate())' +
        ' and year(r.Datenew) = Year(curdate())' +
        ' and p.receipt = r.id  ' +
        ' and t.id = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by day(r.Datenew);',
        queryThisYearMonthlyTran1: 'SELECT distinct month(r.Datenew) as month,ifnull(sum(p.total),0) as total,' +
        'ifnull(count(p.TRANSID),0) as tran, round((sum(p.total)/count(p.TRANSID) ),2) as avg FROM receipts as r,payments as p ' +
        ' where year(r.Datenew) = Year(curdate())' +
        ' and p.receipt = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by month(r.Datenew);',

    queryThisYearMonthlyTran: 'SELECT distinct month(r.Datenew) as month,ifnull(sum(p.total),0) as total,' +
        'ifnull(count(distinct(t.id)),0) as tran, round((sum(p.total)/count(distinct(t.id)) ),2) as avg FROM receipts as r,payments as p, tickets as t ' +
        ' where year(r.Datenew) = Year(curdate())' +
        ' and p.receipt = r.id' +
        ' and t.id = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by month(r.Datenew);',

        queryHourlyTranBydate: 'SELECT hour(r.Datenew) as hour,sum(p.total) as total,count(distinct(t.id)) as tran, (sum(p.total)/count(distinct(t.id))) as avg FROM receipts as r,payments as p , tickets as t ' +
        ' where Convert(r.Datenew,date) = ? ' +
        ' and p.receipt = r.id ' +
        ' and t.id = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by hour(r.Datenew)',



    queryHourlyTranBydate1: ' SELECT hour(r.Datenew) as hour,sum(p.total) as total,count(p.TRANSID) as tran, (sum(p.total)/count(p.TRANSID) ) as avg FROM receipts as r,payments as p' +
        ' where Convert(r.Datenew,date) = ?' +
        ' and p.receipt = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by hour(r.Datenew)',
    queryDailyTranByMonthYear: ' SELECT day(r.Datenew) as day,sum(p.total) as total,count(distinct(t.id))  as tran, (sum(p.total)/count(distinct(t.id)) ) as avg FROM receipts as r,payments as p, tickets as t ' +
        ' where month(r.Datenew) = ?' +
        ' and year(r.Datenew) = ?' +
        ' and p.receipt = r.id' +
        ' and t.id = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by day(r.Datenew);',
        queryDailyTranByMonthYear1: ' SELECT day(r.Datenew) as day,sum(p.total) as total,count(p.TRANSID) as tran, (sum(p.total)/count(p.TRANSID) ) as avg FROM receipts as r,payments as p' +
        ' where month(r.Datenew) = ?' +
        ' and year(r.Datenew) = ?' +
        ' and p.receipt = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by day(r.Datenew);',
    queryMonthlyTranByYear: ' SELECT month(r.Datenew) as month,sum(p.total) as total,count(distinct(t.id))  as tran, (sum(p.total)/count(distinct(t.id))) as avg FROM receipts as r,payments as p, tickets as t ' +
        ' where year(r.Datenew) = ?' +
        ' and p.receipt = r.id' +
        ' and t.id = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by month(r.Datenew);',
        queryMonthlyTranByYear1: ' SELECT month(r.Datenew) as month,sum(p.total) as total,count(p.TRANSID) as tran, (sum(p.total)/count(p.TRANSID) ) as avg FROM receipts as r,payments as p' +
        ' where year(r.Datenew) = ?' +
        ' and p.receipt = r.id' +
        ' and p.payment <> \"cashout\" and p.payment <> \"cashin\"' +
        ' and p.payment <> \"paper out\"' +
        ' group by month(r.Datenew);'

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