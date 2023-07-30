const mysql = require('mysql');
const express = require('express');
const { error } = require('console');
const bcrypt = require("bcrypt");
const decodedUserId = require('../Authentication/decodedToken');


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
    const password = body.password;


    // check the employee already exist or not
    const checkQuery = "select * from accountmanagement.employees where nic = ? ;";

    // type id is the forigen key so we set the forigen key correctly 
    const insertQuery = "insert into accountmanagement.employees (employee_name, address, mobile, email, nic, type_id, dob, password) values(?,?,?,?,?,?,?,?);";


    // response has 3 field 
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(checkQuery, [body.nic], (err,result) => {
        if(err){
            console.log(err);
            res.send({
                sucess : false,
                isError : true,
                isExist : false,
                error : err
            });
        }
        else{
            if (result.length > 0){
                res.send({
                    sucess : false,
                    isError : false,
                    isExist : true,
                    error : null
                });
            }
            else{
                // encrpt the user pasword
                bcrypt.hash(password, 10, function(err, hash) {
                    // store hash in the database
                    connection.query(insertQuery,[body.employee_name,body.address, body.mobile, body.email, body.nic, body.type_id, body.dob, hash], (err, result) => {
                        if (err){
                            res.send({
                                sucess : false,
                                isError : true,
                                isExist : false,
                                error : err
                            });
                        }
                        else {
                            res.send({
                                sucess: true,
                                isError : false,
                                isExist : false,
                                error : null
                            });
                        }
                    });
                });
            }
            
        }
    });
    
});


router.post('/edit', (req, res) => {
    body = req.body;
    const password = body.password;

    bcrypt.hash(password, 10, function(err, hash) {
        // store hash in the database
        const updateQuery = "UPDATE accountmanagement.employees SET employee_name = "+ mysql.escape(body.employee_name) +", address = "+ mysql.escape(body.address) +", mobile= "+ mysql.escape(body.mobile) +", email = "+ mysql.escape(body.email) +", nic = "+ mysql.escape(body.nic) +", type_id = "+ mysql.escape(body.type_id) +", dob = "+ mysql.escape(body.dob) +", password = "+ mysql.escape(hash) +" WHERE (employee_id = "+mysql.escape(body.employee_id)+");";
    
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
});


router.get('/showAll', (req,res) => {

    const selectQuery = "SELECT employee_id, employee_name, type, address, mobile, email, nic, dob FROM employees join employee_type using(type_id);";

    connection.query(selectQuery,(err,result)=>{
        if(err){
            console.log(err);
            res.send({
                sucess : false,
                isError : true,
                error:err,
                result:null
            });
        }
        else{
            res.send({
                sucess : true,
                isError : false,
                error: null,
                result: result
            });
        }
    });
});



router.post('/showCurrent', (req,res) => {
    try{
        const sessionToken = req.headers.authorization.replace('key ','');
        const employee_id = decodedUserId(sessionToken);
    
        // const employee_id = req.body.employee_id;

        const selectQuery = "SELECT employee_id, employee_name, type, address, mobile, email, nic, dob FROM employees join employee_type using(type_id) where employee_id = "+ mysql.escape(employee_id) +";";

        connection.query(selectQuery,(err,result)=>{
            if(err){
                console.log(err);
                res.send({
                    sucess : false,
                    isError : true,
                    error:err,
                    result:null
                });
            }
            else{
                res.send({
                    sucess : true,
                    isError : false,
                    error: null,
                    result: result
                });
            }
        });
    }
    catch(err){
        res.send({isTokenValied : false});
    }
});



router.post('/count', (req,res) => {
    try{
        const sessionToken = req.headers.authorization.replace('key ','');
        const employee_id = decodedUserId(sessionToken);
        const date =req.body.date;
    
        // const employee_id = req.body.employee_id;

        const selectQuery = "select sum(count) as count from (select count(employee_id) as count from cash_sales where employee_id = " + employee_id +" and locate("+ date +", date) union all select count(employee_id) as count from credit_partial_settle where employee_id = " + employee_id +" and locate("+ date +", date) union all select count(employee_id) as count from advance_ap_partial_settle where employee_id = " + employee_id +" and locate("+ date +", date) union all select count(employee_id) as count from advance_bp_partial_settle where employee_id = " + employee_id +" and locate("+ date +", date)) AS subquery;";

        connection.query(selectQuery,(err,result)=>{
            if(err){
                console.log(err);
                res.send({
                    sucess : false,
                    isError : true,
                    error:err,
                    result:null
                });
            }
            else{
                res.send({
                    sucess : true,
                    isError : false,
                    error: null,
                    result: result
                });
            }
        });
    }
    catch(err){
        res.send({isTokenValied : false});
    }
});

router.post("/filterEmployeeNIC", (req, res) => {
    const nic = req.body.nic;
    const selectQuery =
    "SELECT employee_id, employee_name, type, address, mobile, email, nic, dob FROM employees join employee_type using(type_id) where nic = "+ mysql.escape(nic) +";";
      mysql.escape(body.nic) +
      ");";
  
    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          error:err,
          result: null,
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          error: null,
          result: result,
        });
      }
    });
  });
  

  router.get('/editAccessableEmployee', (req,res) => {
    
        // const employee_id = req.body.employee_id;

        const selectQuery = "SELECT employee_id, employee_name, type, address, mobile, email, nic, dob FROM employees join employee_type using(type_id) where edit_access = 1 ";

        connection.query(selectQuery,(err,result)=>{
            if(err){
                console.log(err);
                res.send({
                    sucess : false,
                    isError : true,
                    error:err,
                    result:null
                });
            }
            else{
                res.send({
                    sucess : true,
                    isError : false,
                    error: null,
                    result: result
                });
            }
        });
});


router.post('/giveEditAccess', (req, res) => {
    body = req.body;

        const giveAccessQuery = "UPDATE accountmanagement.employees SET edit_access = 1  edit_access_at = "+ mysql.escape(body,date) +" WHERE (employee_id = "+mysql.escape(body.employee_id)+");";
    
        //  response has 2 field 
        // error occur then error = true , otherwise error = false
        // employee regeister is sucess then sucess=true
        connection.query(giveAccessQuery, (err,result) => {
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


router.post('/checkEditAccess', (req,res) => {
    try{
        const sessionToken = req.headers.authorization.replace('key ','');
        const employee_id = decodedUserId(sessionToken);
    
        // const employee_id = req.body.employee_id;

        const selectQuery = "SELECT count(employee_id) as count FROM employees join employee_type using(type_id) where employee_id = "+ mysql.escape(employee_id) + ", and edit_access = 1;";

        connection.query(selectQuery,(err,result)=>{
            if(err){
                console.log(err);
                res.send({
                    sucess : false,
                    isError : true,
                    error:err,
                    result:null
                });
            }
            else{
                res.send({
                    sucess : true,
                    isError : false,
                    error: null,
                    result: result
                });
            }
        });
    }
    catch(err){
        res.send({isTokenValied : false});
    }
});



module.exports = router;