var moment = require('moment');


var today = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

var stocks = {

    queryByCode:
        ' SELECT ID,CODE,NAME,DISPLAY,' +
        ' (SELECT CATEGORIES.NAME FROM CATEGORIES WHERE CATEGORIES.ID=PRODUCTS.CATEGORY) AS CAT_NAME,' +
        ' PRICEBUY,PRICESELL,IMAGE, ' +
        ' (SELECT STOCKCURRENT.UNITS FROM STOCKCURRENT WHERE STOCKCURRENT.PRODUCT = PRODUCTS.ID) AS STOCK,' +
        ' (SELECT TAXES.RATE FROM TAXES WHERE TAXES.CATEGORY = PRODUCTS.TAXCAT ) AS TAX_RATE ' +
        ' FROM PRODUCTS ' +
        ' WHERE CODE=?',
        queryAllStocks:
        ' SELECT ID,CODE,NAME,DISPLAY,' +
        ' (SELECT CATEGORIES.NAME FROM CATEGORIES WHERE CATEGORIES.ID=PRODUCTS.CATEGORY) AS CAT_NAME,' +
        ' PRICEBUY,PRICESELL,IMAGE, ' +
        ' (SELECT STOCKCURRENT.UNITS FROM STOCKCURRENT WHERE STOCKCURRENT.PRODUCT = PRODUCTS.ID) AS STOCK,' +
        ' (SELECT TAXES.RATE FROM TAXES WHERE TAXES.CATEGORY = PRODUCTS.TAXCAT ) AS TAX_RATE ' +
        ' FROM PRODUCTS ' ,
        queryByProductId:
        ' SELECT ID,CODE,NAME,DISPLAY,' +
        ' (SELECT CATEGORIES.NAME FROM CATEGORIES WHERE CATEGORIES.ID=PRODUCTS.CATEGORY) AS CAT_NAME,' +
        ' PRICEBUY,PRICESELL,IMAGE, ' +
        ' (SELECT STOCKCURRENT.UNITS FROM STOCKCURRENT WHERE STOCKCURRENT.PRODUCT = PRODUCTS.ID) AS STOCK,' +
        ' (SELECT TAXES.RATE FROM TAXES WHERE TAXES.CATEGORY = PRODUCTS.TAXCAT ) AS TAX_RATE ' +
        ' FROM PRODUCTS ' +
        ' WHERE ID=?',

        queryByName:
        ' SELECT ID,CODE,NAME,DISPLAY,' +
        ' (SELECT CATEGORIES.NAME FROM CATEGORIES WHERE CATEGORIES.ID=PRODUCTS.CATEGORY) AS CAT_NAME,' +
        ' PRICEBUY,PRICESELL,IMAGE, ' +
        ' (SELECT STOCKCURRENT.UNITS FROM STOCKCURRENT WHERE STOCKCURRENT.PRODUCT = PRODUCTS.ID) AS STOCK,' +
        ' (SELECT TAXES.RATE FROM TAXES WHERE TAXES.CATEGORY = PRODUCTS.TAXCAT ) AS TAX_RATE ' +
        ' FROM PRODUCTS ' +
        ' WHERE NAME=?',

        queryStockDiary:
        ' select s.ID, DAtenew as date, reason, p.name,s.product as productId, s.units, '+ 
        // ' Round(p.pricebuy * (1+ (SELECT TAXES.RATE FROM TAXES WHERE TAXES.CATEGORY = p.TAXCAT) ) ,2) as buy, '+
        ' Round(p.pricebuy,2) as buy, '+
        ' Round(s.price * (1+ (SELECT TAXES.RATE FROM TAXES WHERE TAXES.CATEGORY = p.TAXCAT) ) ,2) as Price'+
         ' from stockdiary s , products p where p.id = s.product',


         insertStockDiary:
         'INSERT INTO `stockdiary` (`ID`, `DATENEW`, `REASON`, `LOCATION`, `PRODUCT`, `ATTRIBUTESETINSTANCE_ID`, `UNITS`, `PRICE`, `EXPIRE_DATE`)'+ 
         ' VALUES (?, ?, ?, ?, ?, NULL, ?, ?, NULL)',
    // queryUpdateCurrentStockByProductID:
    //
    // 'SELECT COUNT(*) as result FROM STOCKCURRENT WHERE STOCKCURRENT.PRODUCT = ?;' +
    //     '' +
    //     'IF (result == 0)' +
    //     'THEN INSERT INTO INTO STOCKCURRENT (PRODUCT,UNITS,LOCATION) VALUES (?,?,?);' +
    //     'ELSE' +
    //     '    UPDATE STOCKCURRENT SET UNITS = ? WHERE LOCATION = ? AND PRODUCT = ? ;' +
    //     'END IF;',
    querySelectProductInCurrentStock:
    'SELECT COUNT(*) as result FROM STOCKCURRENT WHERE STOCKCURRENT.PRODUCT = ?'
    ,
    queryInsertProductInCurrentStock:
    'INSERT INTO STOCKCURRENT (PRODUCT,UNITS,LOCATION) VALUES (?,?,?);',
    queryUpdateProductInCurrentStock:
    'UPDATE STOCKCURRENT SET UNITS = ? WHERE LOCATION = ? AND PRODUCT = ? ;',


    queryInsertRecordInStockDiary:
    'INSERT INTO STOCKDIARY (ID, DATENEW, REASON, LOCATION, PRODUCT, ATTRIBUTESETINSTANCE_ID, UNITS, PRICE) ' +
        'VALUES (?, NOW(), ?, ?, ?, NULL, ?, ?)',
    queryUpdateProductBuyPriceByID:
    'UPDATE PRODUCTS SET PRICEBUY=? WHERE ID=?',
    queryUpdateProductSellPriceByID:
    'UPDATE PRODUCTS SET PRICESELL=? WHERE ID=?',
};

module.exports = stocks;