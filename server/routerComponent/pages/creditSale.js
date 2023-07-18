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

router.post("/edit", (req, res) => {
  const body = req.body;
  const amount = body.bill_amount - body.discount;

  const updateQuery =
    "UPDATE accountmanagement.credit_sales SET type_id = " +
    mysql.escape(body.type_id) +
    ", manual_invoice_id = " +
    mysql.escape(body.manual_invoice_id) +
    ", customer_id = " +
    mysql.escape(body.customer_id) +
    ", description = " +
    mysql.escape(body.description) +
    ", bill_amount = " +
    mysql.escape(body.bill_amount) +
    ", discount =" +
    mysql.escape(body.discount) +
    ", amount =" +
    mysql.escape(amount) +
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

  const settleQuery = "insert into accountmanagement.credit_partial_settle (type_id,invoice_id, customer_id, description, settle_amount, balance, employee_id ) values (?,?,?,?,?,?,?);";

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
  const selectQuery = "select invoice_id, manual_invoice_id,type_id, date, amount, balance, customer_id,customer_name, business_name, mobile, office_num from credit_sales left join customers using (customer_id) where balance <> '0'  order by date limit 10;"

  connection.query(selectQuery, (err, result) => {
    if (err) {
      console.log(err)
      res.send({
          sucess : false,
          error : true,
          result : result
      })
    }
    else{
        res.send({
            sucess : true,
            error : false,
            result : result
        })
    }
  });

});


// this show the history of the specific transection 
router.post('/histoyCreditTransection', (req, res) =>{
  const body = req.body;

  const selectQuery = "select invoice_id,type_id, date, settle_amount, balance, customer_id,customer_name, business_name from credit_partial_settle left join customers using (customer_id) where invoice_id = "+ mysql.escape(body.invoice_id) +"  order by date;";

  connection.query(selectQuery, (err, result) => {
    if (err) {
      console.log(err)
      res.send({
          sucess : false,
          error : true,
          result : result
      })
    }
    else{
        res.send({
            sucess : true,
            error : false,
            result : result
        })
    }
  });
});



module.exports = router;


//  this try code if the edit re=ansection we want to edit 2 table
// router.post("/edit", (req, res) => {
//   const body = req.body;
//   const amount = body.bill_amount - body.discount;
//   let transectionID ;

//   const selectIDQuery = "select id from credit_partial_settle Settle where invoice_id = "+ mysql.escape(body.invoice_id) +" order by date desc limit 1  "

//   connection.query(selectIDQuery, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send({
//         sucess: false,
//         error: true,
//       });
//     } else {
//       transectionID = result[0].id;
//     }
//   });

//   const  updatePartialSettleQuery =
//     "UPDATE accountmanagement.credit_partial_settle SET type_id = " +
//     mysql.escape(body.type_id) +
//     ", invoice_id = " +
//     mysql.escape(body.invoice_id) +
//     ", customer_id = " +
//     mysql.escape(body.customer_id) +
//     ", description = " +
//     mysql.escape(body.description) +
//     ", settle_amount = '0' , balance =" +
//     mysql.escape(amount) + 
//     " WHERE (id = " +
//     mysql.escape(transectionID) +
//     ");";

//     const updateQuery =
//     "UPDATE accountmanagement.credit_sales SET type_id = " +
//     mysql.escape(body.type_id) +
//     ", manual_invoice_id = " +
//     mysql.escape(body.manual_invoice_id) +
//     ", customer_id = " +
//     mysql.escape(body.customer_id) +
//     ", description = " +
//     mysql.escape(body.description) +
//     ", bill_amount = " +
//     mysql.escape(body.bill_amount) +
//     ", discount =" +
//     mysql.escape(body.discount) +
//     ", amount =" +
//     mysql.escape(amount) +
//     ", updated_by = " +
//     mysql.escape(body.employee_id) +
//     "  WHERE (invoice_id = " +
//     mysql.escape(body.invoice_id) +
//     ");";

//   //  response has 2 field
//   // error occur then error = true , otherwise error = false
//   // employee regeister is sucess then sucess=true
//   connection.query(updateQuery, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send({
//         sucess: false,
//         error: true,
//       });
//     } else {
//       connection.query(updatePartialSettleQuery, (err, result) => {
//         console.log(updatePartialSettleQuery);
//         console.log(transectionID);
//         if (err) {
//           console.log(err);
//           res.send({
//             sucess: false,
//             error: true,
//           });
//         } else {
//           res.send({
//             sucess: true,
//             error: false,
         
//           });
//           console.log(result)
//         }
//       });
//     }
//   });
// });

