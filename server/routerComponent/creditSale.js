const mysql = require('mysql')
const express = require('express');

const router = express.Router();

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'accountmanagement'
});

connection.connect((err) => {
    if (err) {
        console.log('creditSale error database connection' );
        console.log(err);
    }
    else {
        console.log('creditSale connected');
    }
})

router.post('/add', (req, res) => {
    body  = req.body;

    const insertQuery = "insert into accountmanagement.credit_sales (type_id,manual_invoice_id, customer_id, description, bill_amount, discount, employee_id ) values (?,?,?,?,?,?,?);";

    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(insertQuery, [body.type_id, body.manual_invoice_id, body.customer_id, body.description, body.bill_amount, body.discount, body.employee_id ], (err, result) => {
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
    const selectQuery = "SELECT invoice_id, accountmanagement.credit_sales.type_id, type, manual_invoice_id,customer_id, description, bill_amount, discount, date  FROM accountmanagement.credit_sales join accountmanagement.income_type using (type_id) order by(date) desc;";

    connection.query(selectQuery, (err, result) => {
        if(err){
            res.send({
                sucess : false,
                error : true,
                data : null
            });
        }
        else {
            res.send({
                sucess : true,
                error : false,
                data : result
            });
        }
    })
});

module.exports = router;