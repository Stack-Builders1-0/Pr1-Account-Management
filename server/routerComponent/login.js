const mysql = require('mysql');
const express = require('express');
const bcrypt = require("bcrypt");

const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'accountmanagement'
});

connection.connect((err) => {
    if(err){
        console.log('login error database connection');
        console.log(err);
    }
    else{
        console.log("login connected");
    }
    
});

//  body has nic and password 
router.post('/', (req, res) => {
    body = req.body;
    const password = body.password;

    // check the employee already exist or not
    const getQuery = "select password from accountmanagement.employees where nic = ? ;";

    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(getQuery, [body.nic], (err,result) => {
        if(err){
            res.send({
                sucess : false,
                error : true,
                exist : false
            });
        }
        else{
            if (result.length == 0){
                res.send({
                    sucess : false,
                    error : false,
                    exist : false
                });
            }
            else{
                const hash = result[0].password;
                bcrypt.compare(password, hash, function(err, result) {
                    if (result) {
                        // password is valid
                        res.send({
                            sucess: true,
                            error : false,
                            exist : true
                        });
                    }
                    else {
                        res.send({
                            sucess : false,
                            error : false,
                            exist : true
                        });
                    }
                });
                    
            }
            
        }
    });
    
});



module.exports = router;