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
        console.log('creditSettle error database connection' );
        console.log(err);
    }
    else {
        console.log('creditSettle connected');
    }
})

router.post('/settle', (req, res) => {
    body  = req.body;

    const settleQuery = "insert into accountmanagement.credit_partial_settle (type,invoice_id, customer_id, description, settle_amount, employee_id ) values (?,?,?,?,?,?);";

    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(settleQuery, [body.type_id, body.invoice_id, body.customer_id, body.description, body.settle_amount, body.employee_id ], (err, result) => {
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




module.exports = router;