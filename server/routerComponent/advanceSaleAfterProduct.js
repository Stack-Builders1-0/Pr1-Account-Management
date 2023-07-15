const mysql = require("mysql");
const express = require("express");

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "accountmanagement",
});

connection.connect((err) => {
  if (err) {
    console.log("advanceSaleAfterProduct error database connection");
    console.log(err);
  } else {
    console.log("advanceSaleAfterProduct connected");
  }
});

router.post("/add", (req, res) => {
  const body = req.body;
  const amount = body.bill_amount - body.discount;
  const balance = amount - body.advance_amount;

  const insertQuery =
    "insert into accountmanagement.advance_sales_ap (type_id,manual_invoice_id, customer_id, description, bill_amount,advance_amount, discount, amount,balance, employee_id ) values (?,?,?,?,?,?,?,?,?,?);";

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
      body.advance_amount,
      body.discount,
      amount,
      balance,
      body.employee_id,
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
    "SELECT invoice_id, accountmanagement.advance_sales_ap.type_id, type, manual_invoice_id,customer_id, description, bill_amount,advance_amount, discount, amount, balance, date  FROM accountmanagement.advance_sales_ap join accountmanagement.income_type using (type_id) order by(date) desc;";

  connection.query(selectQuery, (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        error: true,
        data: null,
      });
    } else {
      res.send({
        sucess: true,
        error: false,
        data: result,
      });
    }
  });
});

router.post("/edit", (req, res) => {
  const body = req.body;
  const amount = body.bill_amount - body.discount;
  const balance = amount - body.advance_amount;

  const updateQuery =
    "UPDATE accountmanagement.advance_sales_ap SET type_id = " +
    mysql.escape(body.type_id) +
    ", manual_invoice_id = " +
    mysql.escape(body.manual_invoice_id) +
    ", customer_id = " +
    mysql.escape(body.customer_id) +
    ", description = " +
    mysql.escape(body.description) +
    ", bill_amount = " +
    mysql.escape(body.bill_amount) +
    ", advance_amount = " +
    mysql.escape(body.advance_amount) +
    ", discount =" +
    mysql.escape(body.discount) +
    ", amount =" +
    mysql.escape(amount) +
    ", balance =" +
    mysql.escape(balance) +
    ", updated_by = " +
    mysql.escape(body.employee_id) +
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


router.post('/settle', (req, res) => {
  body  = req.body;
  const balance = body.balance -body.settle_amount;

  const settleQuery = "insert into accountmanagement.advance_ap_partial_settle (type_id,invoice_id, customer_id, description, settle_amount, balance, employee_id ) values (?,?,?,?,?,?,?);";

  // response has 3 field 
  // error occur then error = true , otherwise error = false
  // exist => if the employee nic alredy regiterd exist = true else exist = false
  // employee regeister is sucess then sucess=true
  connection.query(settleQuery, [body.type_id, body.invoice_id, body.customer_id, body.description, body.settle_amount, balance, body.employee_id ], (err, result) => {
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


// this show the 15 transection which transection not settle 
router.get('/creditNotSettle', (req, res) => {
  const selectQuery = "select invoice_id, manual_invoice_id,type_id, date, amount, balance, customer_id,customer_name, business_name, mobile, office_num from advance_sales_ap left join customers using (customer_id) where balance <> 0  order by date limit 10;"

  connection.query(selectQuery, (err, result) => {
    if (err) {
      console.log(err)
      res.send({
          sucess : false,
          error : true,
          data : result
      })
    }
    else{
        res.send({
            sucess : true,
            error : false,
            data : result
        })
    }
  });

});



// this show the history of the specific transection 
router.post('/histoyCreditTransection', (req, res) =>{
  const body = req.body;

  const selectQuery = "select invoice_id,type_id, date, settle_amount, balance, customer_id,customer_name, business_name from advance_ap_partial_settle left join customers using (customer_id) where invoice_id = "+ mysql.escape(body.invoice_id) +"  order by date;";

  connection.query(selectQuery, (err, result) => {
    if (err) {
      console.log(err)
      res.send({
          sucess : false,
          error : true,
          data : result
      })
    }
    else{
        res.send({
            sucess : true,
            error : false,
            data : result
        })
    }
  });
});



module.exports = router;
