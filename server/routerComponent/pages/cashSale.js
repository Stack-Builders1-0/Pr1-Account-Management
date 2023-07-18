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



router.post('/add', (req, res) => {
    const body = req.body;
    const amount = body.bill_amount - body.discount;

    const insertQuery = "insert into accountmanagement.cash_sales (type_id,manual_invoice_id, customer_id, description, bill_amount, discount, amount, employee_id ) values (?,?,?,?,?,?,?,?);";

    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(insertQuery, [body.type_id, body.manual_invoice_id, body.customer_id, body.description, body.bill_amount, body.discount, amount, body.employee_id ], (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                sucess : false,
                error : true,
                exist : false
            })
        }
        else{
            res.send({
                sucess : true,
                error : false,
                exist : false
            })
        }
    });
});


router.get('/showAll', (req, res) => {
    
    const selectQuery = "SELECT invoice_id, accountmanagement.cash_sales.type_id, type, manual_invoice_id,customer_id, description, bill_amount, discount, amount, date  FROM accountmanagement.cash_sales join accountmanagement.income_type using (type_id) order by(date) desc;";

    connection.query(selectQuery, (err, result) => {
        if(err){
            res.send({
                sucess : false,
                error : true,
                result : null
            });
        }
        else {
            res.send({
                sucess : true,
                error : false,
                result : result
            });
        }
    })

});




router.post('/edit',(req,res) => {
    const body = req.body;
    const amount = body.bill_amount - body.discount;

    const updateQuery = "UPDATE accountmanagement.cash_sales SET type_id = "+mysql.escape(body.type_id) +", manual_invoice_id = "+mysql.escape(body.manual_invoice_id) +", customer_id = "+mysql.escape(body.customer_id) +", description = "+mysql.escape(body.description) +", bill_amount = "+mysql.escape(body.bill_amount) +", discount ="+mysql.escape(body.discount) +", amount ="+ mysql.escape(amount) +", updated_by = "+mysql.escape(body.employee_id) +"  WHERE (invoice_id = "+mysql.escape(body.invoice_id) +");";
    
    //  response has 2 field 
    // error occur then error = true , otherwise error = false
    // employee regeister is sucess then sucess=true
    connection.query(updateQuery, (err,result) => {
        if(err){
            console.log(err);
            res.send({
                sucess : false,
                error : true
            });
        }
        else{
            res.send({
                sucess : true,
                error : false
            });
        }
    });
});


module.exports = router;