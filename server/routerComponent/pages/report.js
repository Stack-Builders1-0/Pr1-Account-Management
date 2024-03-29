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
    console.log("report error database connection");
    console.log(err);
  } else {
    console.log("report connected");
  }
});

router.post("/getSales", (req, res) => {
  const body = req.body;

  //   const sessionToken = req.headers.authorization.replace('key ','');

  //   const employee_id = decodeUserId(sessionToken);

  const getQuery = "SELECT * FROM combine_sales where locate(?,date);";

  connection.query(getQuery, [body.date], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        isError: true,
        error: err,
        result: result,
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

router.post("/getSalesBetweenDate", (req, res) => {
  const body = req.body;

  //   const sessionToken = req.headers.authorization.replace('key ','');

  //   const employee_id = decodeUserId(sessionToken);

  const getQuery =
    "SELECT * FROM total_transection where date >= ? and date < ? order by date;";
  // const getQuery = "SELECT * FROM total_transection where date >= ? and date < ? order by date;";

  connection.query(getQuery, [body.startDate, body.endDate], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        isError: true,
        error: err,
        result: result,
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

module.exports = router;
