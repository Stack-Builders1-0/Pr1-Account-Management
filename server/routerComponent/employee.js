const mysql = require('mysql');
const express = require('express');

const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'accountmanagement'
});

connection.connect((err) => {
    if(err){
        console.log('employee error database connection');
        console.log(err);
    }
    else{
        console.log("employee connected");
    }
    
});

router.post('/add', (req, res) => {
    body = req.body;

    // check the employee already exist or not
    const checkQuery = "select * from accountmanagement.employees where nic = ? ;";

    // type id is the forigen key so we set the forigen key correctly 
    const insertQuery = "insert into accountmanagement.employees (employee_name, address, mobile, email, nic, type_id, age) values(?,?,?,?,?,?,?);";


    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(checkQuery, [body.nic], (err,result) => {
        if(err){
            res.send({
                sucess : false,
                error : true,
                exist : false
            });
        }
        else{
            if (result.length > 0){
                res.send({
                    sucess : false,
                    error : false,
                    exist : true
                });
            }
            else{
                connection.query(insertQuery,[body.employee_name,body.address, body.mobile, body.email, body.nic, body.type_id, body.age], (err, result) => {
                    if (err){
                        res.send({
                            sucess : false,
                            error : true,
                            exist : false
                        });
                    }
                    else {
                        res.send({
                            sucess: true,
                            error : false,
                            exist : false
                        });
                    }
                });
            }
            
        }
    });
    
});


router.post('/edit', (req, res) => {
    body = req.body;

    const updateQuery = "UPDATE accountmanagement.employees SET employee_name = "+ mysql.escape(body.employee_name) +", address = "+ mysql.escape(body.address) +", mobile= "+ mysql.escape(body.mobile) +", email = "+ mysql.escape(body.email) +", nic = "+ mysql.escape(body.nic) +", type_id = "+ mysql.escape(body.type_id) +", age = "+ mysql.escape(body.age) +" WHERE (employee_id = "+mysql.escape(body.employee_id)+");";

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