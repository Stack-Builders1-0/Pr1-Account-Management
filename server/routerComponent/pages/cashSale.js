const mysql = require("mysql");
const express = require("express");
const decodedUserId = require("../Authentication/decodedToken");

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "accountmanagement",
});

connection.connect((err) => {
  if (err) {
    console.log("cashSales error database connection");
    console.log(err);
  } else {
    console.log("cashSales Connected");
  }
});

router.post("/add", (req, res) => {
  const body = req.body;
  const amount = body.bill_amount - body.discount;

  const sessionToken = req.headers.authorization.replace("key ", "");
  const employee_id = decodedUserId(sessionToken);

  const insertQuery =
    "insert into accountmanagement.cash_sales (type_id,manual_invoice_id, customer_id, description, bill_amount, discount, amount, employee_id ) values (?,?,?,?,?,?,?,?);";

  // response has 3 field
  // error occur then error = true , otherwise error = false
  // exist => if the employee nic alredy regiterd exist = true else exist = false
  // employee regeister is sucess then sucess=true
  connection.query(
    insertQuery,
    [
      body.type_id,
      body.manual_invoice_id,
      body.customer_id,
      body.description,
      body.bill_amount,
      body.discount,
      amount,
      employee_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          isExist: false,
          error: err,
          result: null,
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          isExist: false,
          error: null,
          result: result,
        });
      }
    }
  );
});

router.get("/showAll", (req, res) => {
  const selectQuery =
    "SELECT invoice_id, accountmanagement.cash_sales.type_id, type, manual_invoice_id,customer_id, description, bill_amount, discount, amount, date  FROM accountmanagement.cash_sales join accountmanagement.income_type using (type_id) order by(date) desc;";

  connection.query(selectQuery, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isError: true,
        error: err,
        result: null,
      });
    } else {
      res.send({
        sucess: true,
        isError: false,
        result: result,
      });
    }
  });
});

router.post("/edit", (req, res) => {
  const body = req.body.data;
  const amount = body.billAmount - body.discount;

  const sessionToken = req.headers.authorization.replace("key ", "");
  const employee_id = decodedUserId(sessionToken);

  const updateQuery =
    "UPDATE accountmanagement.cash_sales SET type_id = " +
    mysql.escape(body.type_id) +
    ", manual_invoice_id = " +
    mysql.escape(body.manual_invoice_id) +
    ", customer_id = " +
    mysql.escape(body.customer_id) +
    ", description = " +
    mysql.escape(body.description) +
    ", bill_amount = " +
    mysql.escape(body.billAmount) +
    ", discount =" +
    mysql.escape(body.discount) +
    ", amount =" +
    mysql.escape(amount) +
    ", updated_by = " +
    mysql.escape(employee_id) +
    "  WHERE (invoice_id = " +
    mysql.escape(body.invoice_id) +
    ");";

  //  response has 2 field
  // error occur then error = true , otherwise error = false
  // employee regeister is sucess then sucess=true
  connection.query(updateQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        isError: true,
        error: err,
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


router.post("/filterManualInvoice", (req, res) => {

  const selectQuery =
    "SELECT * from amount_details_on_date_cash where manual_invoice_id = "+ mysql.escape(req.body.manual_invoice_id);

  connection.query(selectQuery, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isError: true,
        result: null,
      });
    } else {
      if (result.length == 0){
        res.send({
          sucess: true,
          isError: false,
          result: null,
        });
      }else{
        res.send({
          sucess: true,
          isError: false,
          result: result,
        });
      }
      
    }
  });
});


module.exports = router;
