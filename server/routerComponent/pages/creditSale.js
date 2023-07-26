const mysql = require("mysql");
const express = require("express");
const decodedUserId = require("../Authentication/decodedToken");
const CheckEdited = require("./CheckingEditAmount/checkEdited");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "accountmanagement",
});

connection.connect((err) => {
  if (err) {
    console.log("creditSale error database connection");
    console.log(err);
  } else {
    console.log("creditSale connected");
  }
});

router.post("/add", (req, res) => {
  body = req.body;
  const amount = body.bill_amount - body.discount;
  const balance = amount;

  const sessionToken = req.headers.authorization.replace("key ", "");
  const employee_id = decodedUserId(sessionToken);

  const insertQuery =
    "insert into accountmanagement.credit_sales (type_id,manual_invoice_id, customer_id, description, bill_amount, discount, amount,balance, employee_id ) values (?,?,?,?,?,?,?,?,?);";

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
      balance,
      employee_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          sucess: false,
          error: true,
          exist: false,
        });
      } else {
        res.send({
          sucess: true,
          error: false,
          exist: false,
        });
      }
    }
  );
});

router.get("/showAll", (req, res) => {
  const selectQuery =
    "SELECT invoice_id, accountmanagement.credit_sales.type_id, type, manual_invoice_id,customer_id, description, bill_amount, discount, amount, date  FROM accountmanagement.credit_sales join accountmanagement.income_type using (type_id) order by(date) desc;";

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

router.post("/filterManualInvoice", (req, res) => {
  const selectQuery =
    "SELECT * from amount_details_on_date_credit where manual_invoice_id = " +
    mysql.escape(req.body.manual_invoice_id);

  connection.query(selectQuery, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isError: true,
        result: null,
      });
    } else {
      if (result.length == 0) {
        res.send({
          sucess: true,
          isError: false,
          result: null,
        });
      } else {
        res.send({
          sucess: true,
          isError: false,
          result: result,
        });
      }
    }
  });
});


router.post("/edit", (req, res) => {
  const body = req.body.data;
  console.log(body);
  // const checkEdited = new CheckEdited(body.billAmount, body.oldBillAmount, body.discount, body.oldDisCount, body.balance, body.advanceAmount, body.OldAdvanceAmount )
  
  try{

    const sessionToken = req.headers.authorization.replace('key ','');
  const employee_id = decodedUserId(sessionToken);
  // const employee_id = body.employee_id;

  const checkEdited = new CheckEdited(
    body.billAmount,
    body.oldBillAmount,
    body.discount,
    body.oldDisCount,
    body.balance,
    0,
    0
  );

  const bill_amount = checkEdited.updateBillAmount();
  const discount = checkEdited.updateDiscount();
  const balance = checkEdited.updateBalance();
  const amount = bill_amount - discount;

  

  const updateQueryCredit =
    "UPDATE accountmanagement.credit_sales SET type_id = " +
    mysql.escape(body.type_id) +
    ", manual_invoice_id = " +
    mysql.escape(body.manual_invoice_id) +
    ", customer_id = " +
    mysql.escape(body.customer_id) +
    ", description = " +
    mysql.escape(body.description) +
    ", bill_amount = " +
    mysql.escape(bill_amount) +
    ", discount =" +
    mysql.escape(discount) +
    ", amount =" +
    mysql.escape(amount) +
    ", balance =" +
    mysql.escape(balance) +
    ", updated_by = " +
    mysql.escape(employee_id) +
    ", updated_at = " +
    mysql.escape(body.update_at) +
    "  WHERE (invoice_id = " +
    mysql.escape(body.invoice_id) +
    ");";

  const insertQueryCreditPartial =
    "INSERT INTO `accountmanagement`.`credit_partial_settle` (`type_id`, `invoice_id`, `description`, `customer_id`, `settle_amount`, `balance`, `employee_id`) VALUES (?, ?, ?, ?, ?, ?, ?);";

  //  response has 2 field
  // error occur then error = true , otherwise error = false
  // employee regeister is sucess then sucess=true
  connection.query(updateQueryCredit, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        sucess: false,
        error: true,
      });
    } else {
      connection.query(
        insertQueryCreditPartial,
        [
          body.type_id,
          body.invoice_id,
          "edited",
          body.customer_id,
          0,
          balance,
          employee_id,
        ],
        (err, result) => {
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
        }
      );
    }
  });
  } catch (err){
    console.log(err);
    res.send({
      isTokenValied : false
    })
  }
  
});

router.post("/settle", (req, res) => {
  body = req.body.data;
  const balance = body.balance - body.settle_amount;

  try {
    const sessionToken = req.headers.authorization.replace("key ", "");
    const employee_id = decodedUserId(sessionToken);
    console.log(employee_id);

    const settleQuery =
      "insert into accountmanagement.credit_partial_settle (type_id,invoice_id, customer_id, description, settle_amount, balance, employee_id ) values (?,?,?,?,?,?,?);";

    // response has 3 field
    // error occur then error = true , otherwise error = false
    // exist => if the employee nic alredy regiterd exist = true else exist = false
    // employee regeister is sucess then sucess=true
    connection.query(
      settleQuery,
      [
        "cr",
        body.invoice_id,
        body.customer_id,
        body.description,
        body.settle_amount,
        balance,
        employee_id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({
            sucess: false,
            error: true,
            exist: false,
          });
        } else {
          res.send({
            sucess: true,
            error: false,
            exist: false,
          });
        }
      }
    );
  } catch (err) {
    res.send({
      isTokenValied: false,
    });
  }
});

// this show the 15 transection which transection not settle
router.get("/creditNotSettle", (req, res) => {
  const selectQuery =
    "select invoice_id, manual_invoice_id,type_id, date, amount, balance, customer_id,customer_name, business_name, mobile, office_num from credit_sales left join customers using (customer_id) where balance <> '0'  order by date limit 10;";

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

// this show the history of the specific transection
router.post("/histoyCreditTransection", (req, res) => {
  const body = req.body;
  const selectQuery =
    "select invoice_id,type_id, date, settle_amount, balance, customer_id,customer_name, business_name from credit_partial_settle left join customers using (customer_id) where invoice_id = " +
    mysql.escape(body.invoice_id) +
    "  order by date;";
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



//  we want to show the all credit transection on today enter by specific employee
// i want to date yyyy-mm-dd format
router.post("/showTodayForEmployee", (req, res) => {
  const date = req.body.date;

  const sessionToken = req.headers.authorization.replace('key ','');
  const employee_id = decodedUserId(sessionToken);
  const selectQuery =
    "SELECT invoice_id, accountmanagement.credit_sales.type_id, type, manual_invoice_id,customer_id, description, bill_amount, discount, amount, date  FROM accountmanagement.credit_sales join accountmanagement.income_type using (type_id) where employee_id = ? and locate(?, date) order by(date) desc;";

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



//  we want to show the all credit transection on today enter by all employee
// i want to date yyyy-mm-dd format
router.post("/showTodayForOwner", (req, res) => {
  const date = req.body.date;
  const selectQuery =
    "SELECT invoice_id, accountmanagement.credit_sales.type_id, type, manual_invoice_id,customer_id, description, bill_amount, discount, amount, date  FROM accountmanagement.credit_sales join accountmanagement.income_type using (type_id) where locate(?, date) order by(date) desc;";


  connection.query(selectQuery,[date], (err, result) => {
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

module.exports = router;