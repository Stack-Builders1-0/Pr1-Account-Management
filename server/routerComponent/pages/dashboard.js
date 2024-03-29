const mysql = require("mysql");
const express = require("express");
const { decode } = require("punycode");
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

// this is send the total cash income of the specific employee id and todays update
router.post("/totalCashSales", (req, res) => {
  const body = req.body;

  try {
    const sessionToken = req.headers("Authorization").replace("key ", "");
    const employee_id = decodedUserId(sessionToken);

    // date format is yyyy-mm-dd (2023-07-14)
    const selectQuery =
      "SELECT SUM(amount) AS total_cash FROM (SELECT sum(amount) AS amount FROM cash_sales WHERE locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " UNION ALL SELECT sum(advance_amount) AS amount FROM advance_sales_ap WHERE locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " UNION ALL SELECT sum(advance_amount) AS amount FROM advance_sales_bp WHERE locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " UNION ALL SELECT sum(settle_amount) AS amount FROM credit_partial_settle WHERE locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " ) AS subquery;";

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // sucess or not
    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          error: true,
          result: result,
        });
      } else {
        res.send({
          sucess: true,
          error: false,
          result: result,
        });
      }
    });
  } catch (error) {
    res.send({ tokenValied: false })
  }
});

// this is send the total credit income of the specific employee id and todays update
router.post("/totalCreditSales", (req, res) => {
  const body = req.body;

  try {
    const sessionToken = req.headers("Authorization").replace("key ", "");
    const employee_id = decodedUserId(sessionToken);

    // date format is yyyy-mm-dd (2023-07-14)
    const selectQuery =
      "SELECT SUM(credit) AS total_credit FROM (select sum(balance) as credit from advance_sales_ap where locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " UNION ALL select sum(balance) as credit from advance_sales_bp where locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " UNION ALL select sum(balance) as credit from credit_sales where locate( " +
      mysql.escape(body.date) +
      ", date)  and employee_id = " +
      mysql.escape(employee_id) +
      " ) AS subquery;";

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // sucess or not
    connection.query(selectQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          error: true,
          result: result,
          tokenValied: true
        });
      } else {
        res.send({
          sucess: true,
          error: false,
          result: result,
          tokenValied: true
        });
      }
    });

  }
  catch (err) {
    res.send({ tokenValied: false })
  }
});

router.post("/addOpeningBalance", (req, res) => {
  const amount = req.body.amount;


  try {
    const sessionToken = req.headers.authorization.replace("key ", "");
    const employee_id = decodedUserId(sessionToken);
    // const employee_id = req.body.employee_id;

    const settleQuery =
      "insert into opening_balance (employee_id, amount) values (?,?);";

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(settleQuery, [employee_id, amount], (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
        });
      }
    });
  } catch (err) {
    res.send({
      isTokenValied: false,
    });
  }
});

router.post("/isAddOpeningBalance", (req, res) => {
  const date = req.body.date;


  try {
    const sessionToken = req.headers.authorization.replace("key ", "");
    const employee_id = decodedUserId(sessionToken);
    // const employee_id = req.body.employee_id;

    const getQuery =
      "select * from opening_balance where (employee_id= " +
      mysql.escape(employee_id) +
      " and locate(" +
      mysql.escape(date) +
      " , date))";

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(getQuery, (err, result) => {
      if (err) {

        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          isExist: false,
        });
      } else {
        if (result.length == 0) {
          res.send({
            sucess: false,
            isError: false,

            isExist: false,
          });
        } else {
          res.send({
            sucess: true,
            isError: false,
            isExist: true,
          });
        }
      }
    });
  } catch (err) {
    res.send({
      isTokenValied: false,
    });
  }
});

// this show the 15 transection which transection not settle
router.get("/creditNotSettle", (req, res) => {
  const selectQuery =
    "select * from (select * from combine_sales where balance <> '0' and type_id in ('cr', 'ap') union all select * from combine_sales where ( amount <> return_payment )  ) as serch_query order by date limit 15;";

  connection.query(selectQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        error: true,
        result: result,
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

// this is send the total credit income of the specific employee id and todays update
router.post("/totalTransection", (req, res) => {
  const body = req.body;
  try {
    const sessionToken = req.headers.authorization.replace("key ", "");
    const employee_id = decodedUserId(sessionToken);
    // const employee_id = body.employee_id

    // date format is yyyy-mm-dd (2023-07-14)
    const selectQuery = "SELECT SUM(CASE WHEN type_id IN ('cr', 'ap', 'bp') THEN balance ELSE 0 END) AS credit, SUM(CASE WHEN type_id IN ('ca', 'ap', 'bp') THEN amount - balance ELSE 0 END) AS cash FROM total_transection WHERE type_id IN ('ca', 'cr', 'ap', 'bp') AND (type_id <> 'as' OR amount <> return_payment) and employee_id = ? and locate(?, date);"

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // sucess or not
    connection.query(selectQuery, [employee_id, body.date], (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          result: result,
          error: err,
          tokenValied: true
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          result: result,
          tokenValied: true
        });
      }
    });

  }
  catch (err) {
    res.send({ tokenValied: false })
  }
});

// this is send the total credit income of the all todays update
router.post("/totalTransectionForOwner", (req, res) => {
  const body = req.body;

  try {
    const sessionToken = req.headers.authorization.replace("key ", "");
    const employee_id = decodedUserId(sessionToken);
    // const employee_id = body.employee_id

    // date format is yyyy-mm-dd (2023-07-14)
    const selectQuery = "SELECT SUM(CASE WHEN type_id IN ('cr', 'ap', 'bp') THEN balance ELSE 0 END) AS credit, SUM(CASE WHEN type_id IN ('ca', 'ap', 'bp') THEN amount - balance ELSE 0 END) AS cash FROM total_transection WHERE type_id IN ('ca', 'cr', 'ap', 'bp') AND (type_id <> 'bp' OR amount <> return_payment) and locate(?, date);"

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // sucess or not
    connection.query(selectQuery, [employee_id, body.date], (err, result) => {
     if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          result: result,
          error: err,
          tokenValied: true
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          result: result,
          tokenValied: true
        });
      }
    });

  }
  catch (err) {
    res.send({ tokenValied: false })
  }
});

// this show the history of the specific transection
router.post("/histoyCreditTransection", (req, res) => {
  const body = req.body;
  const selectQuery =

    "select id, invoice_id,type_id, date, settle_amount, balance, customer_id,customer_name, business_name from total_transection join customers using (customer_id) where type_id = " +
    mysql.escape(body.type_id) +
    " and invoice_id = " +
    mysql.escape(body.invoice_id) +
    " order by date;";
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

router.post("/editedSales", (req, res) => {
  const date = req.body.date;


  try {
    const sessionToken = req.headers.authorization.replace("key ", "");
    const employee_id = decodedUserId(sessionToken);
    // const employee_id = req.body.employee_id;

    const getQuery =
      "select * from combine_4_sales where (updated_by= " +
      mysql.escape(employee_id) +
      " and locate(" +
      mysql.escape(date) +
      " , updated_at))";

    connection.query(getQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          isError: true,
          result: null,

          error: err,
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          result: result,
          error: null,
        });
      }
    });
  } catch (err) {
    res.send({
      isTokenValied: false,
    });
  }
});

module.exports = router;
