const mysql = require("mysql");
const express = require("express");
const decodeUserId = require("../Authentication/decodedToken");

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "accountmanagement",
});

connection.connect((err) => {
  if (err) {
    console.log("customer error database connection");
    console.log(err);
  } else {
    console.log("customer connected");
  }
});

router.post("/add", (req, res) => {
  const body = req.body;

  const sessionToken = req.headers.authorization.replace('key ','');

  const employee_id = decodeUserId(sessionToken);

  const insertQuery =
    "insert into accountmanagement.customers (customer_name, business_name, adress, mobile, lan_line, w_app_no, office_num, email_id, nic_no, employee_id, credit_limit ) values (?,?,?,?,?,?,?,?,?,?,?);";

  // response has 3 field
  // error occur then error = true , otherwise error = false
  // exist => if the employee nic alredy regiterd exist = true else exist = false
  // employee regeister is sucess then sucess=true
  connection.query(
    insertQuery,
    [
      body.customer_name,
      body.business_name,
      body.adress,
      body.mobile,
      body.lan_line,
      body.w_app_no,
      body.office_num,
      body.email_id,
      body.nic_no,
      employee_id,
      body.credit_limit,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.send({
          sucess: false,
          isError: true,
          isExist: false,
          error : err,
          result : result
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          isExist: false,
          error : null,
          result : result
        });
      }
    }
  );
});

router.post("/showByEmployee", (req, res) => {
  const sessionToken = req.headers.authorization.replace('key ','');

  const employee_id = decodeUserId(sessionToken);

  const selectQuery =
    "SELECT customer_id, customer_name, business_name, adress, lan_line, w_app_no, office_num, email_id, nic_no,credit_limit FROM accountmanagement.customers where employee_id=?;";

  connection.query(selectQuery, [employee_id],(err, result) => {
    if (err) {
      res.send({
        sucess: false,
        error: true,
        result: null,
      });
    } else {
      res.send({
        sucess: true,
        error: false,
        result: result,
      });
    }
  });
});
router.get("/showAll", (req, res) => {
  const selectQuery =
    "SELECT customer_id, customer_name, business_name, adress, lan_line, w_app_no, office_num, email_id, nic_no,credit_limit FROM accountmanagement.customers;";

  connection.query(selectQuery, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        error: true,
        result: null,
      });
    } else {
      res.send({
        sucess: true,
        error: false,
        result: result,
      });
    }
  });
});
router.post("/filterCustomerNIC", (req, res) => {
  const body = req.body;
  const selectQuery =
    "SELECT customer_id, customer_name, business_name, adress, lan_line, w_app_no, office_num, email_id, nic_no,credit_limit FROM accountmanagement.customers where (nic_no = " +
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

router.post("/edit", (req, res) => {
  
  body = req.body;

  const updateQuery =
    "UPDATE accountmanagement.customers SET customer_name = " +
    mysql.escape(body.customer_name) +
    ", business_name = " +
    mysql.escape(body.business_name) +
    ", adress = " +
    mysql.escape(body.address) +
    ", mobile= " +
    mysql.escape(body.mobile) +
    ", lan_line = " +
    mysql.escape(body.lan_line) +
    ", w_app_no = " +
    mysql.escape(body.w_app_no) +
    ", office_num = " +
    mysql.escape(body.office_num) +
    ", email_id = " +
    mysql.escape(body.email_id) +
    ", nic_no = " +
    mysql.escape(body.nic_no) +
    ", credit_limit = " +
    mysql.escape(body.credit_limit) +
    ", updated_by = " +
    mysql.escape(body.employee_id) +
    " WHERE (customer_id = " +
    mysql.escape(body.customer_id) +
    ");";

  //  response has 2 field
  // error occur then error = true , otherwise error = false
  // employee regeister is sucess then sucess=true
  connection.query(updateQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        error: true,
      });
    } else {
      res.send({
        sucess: true,
        error: false,
      });
    }
  });
});

module.exports = router;
