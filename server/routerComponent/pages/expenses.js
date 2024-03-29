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
    console.log("expenses error database connection");
    console.log(err);
  } else {
    console.log("expenses connected");
  }
});

router.post("/add", (req, res) => {
  const body = req.body;

  const sessionToken = req.headers.authorization.replace("key ", "");
  const employee_id = decodedUserId(sessionToken);

  const insertQuery =
    "insert into expenses (type,manual_expense_id, description, amount, employee_id ) values (?,?,?,?,?);";

  
  connection.query(
    insertQuery,
    [
      body.type,
      body.manual_expense_id,
      body.description,
      body.amount,
      employee_id
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          error: err,
          result: null
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          error: null,
          result: result,
        });
      }
    }
  );
});

router.get("/showAll", (req, res) => {
  const selectQuery =
    "SELECT manual_expense_id, type,date,description, amount FROM expenses;";
  connection.query(selectQuery, (err, result) => {
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



//  we want to show the all expenses on today enter by specific employee
// i want to date yyyy-mm-dd format
router.post("/showTodayForEmployee", (req, res) => {
  const date = req.body.date;

  const sessionToken = req.headers.authorization.replace('key ','');
  const employee_id = decodedUserId(sessionToken);


  const selectQuery =
    "SELECT manual_expense_id, type,date,description, amount FROM expenses where employee_id = ? and locate(?, date) ;";


  connection.query(selectQuery,[employee_id, date], (err, result) => {
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



//  we want to show the all expenses transection on today enter by all employee
// i want to date yyyy-mm-dd format
router.post("/showTodayForOwner", (req, res) => {
  const date = req.body.date;

  const selectQuery =
  "SELECT manual_expense_id, type,date,description, amount FROM expenses where locate(?, date) ;";

  connection.query(selectQuery,[date], (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isError: true,
        error: err,
        result: null
      });
    } else {
      res.send({
        sucess: true,
        isError: false,
        error : null,
        result: result
      });
    }
  });
});





module.exports = router;