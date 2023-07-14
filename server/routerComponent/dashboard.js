const mysql = require('mysql');
const express = require('express');

const router = express.Router();

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "accountmanagement"
})

connection.connect( (err) => {
    if(err){
        console.log('cashSales error database connection');
        console.log(err);
    }
    else{
        console.log('cashSales Connected');
    }
});


// this is send the total cash income of the specific employee id and todays update
router.post('/totalCashSales', (req, res) => {
    const body = req.body;
    
    // date format is yyyy-mm-dd (2023-07-14) 
    const selectQuery = "SELECT SUM(amount) AS total_cash FROM (SELECT sum(amount) AS amount FROM cash_sales WHERE locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) +"UNION ALL SELECT sum(advance_amount) AS amount FROM advance_sales_ap WHERE locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) +" UNION ALL SELECT sum(advance_amount) AS amount FROM advance_sales_bp WHERE locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) +" UNION ALL SELECT sum(settle_amount) AS amount FROM credit_partial_settle WHERE locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) +" ) AS subquery;";

    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // sucess or not 
    connection.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                sucess : false,
                error : true,
                data : result
            })
        }
        else{
            res.send({
                sucess : true,
                error : false,
                data : result
            })
        }
    });
});


// this is send the total credit income of the specific employee id and todays update
router.post('/totalCreditSales', (req, res) => {
    const body = req.body;
    
    // date format is yyyy-mm-dd (2023-07-14) 
    const selectQuery = "SELECT SUM(credit) AS total_credit FROM (select sum(balance) as credit from advance_sales_ap where locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) +"UNION ALL select sum(balance) as credit from advance_sales_bp where locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) +" UNION ALL select sum(balance) as credit from credit_sales where locate( "+ mysql.escape(body.date) +", date)  and employee_id = " + mysql.escape(body.employee_id) + " ) AS subquery;";

    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // sucess or not 
    connection.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                sucess : false,
                error : true,
                data : result
            })
        }
        else{
            res.send({
                sucess : true,
                error : false,
                data : result
            })
        }
    });
});

module.exports = router;