const mysql = require("mysql");
const express = require("express");
const bcrypt = require("bcrypt");
const generateSessionToken = require("./generateSessionToken");
const decodeUserId = require("./decodedToken");
const { error } = require("console");

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "accountmanagement",
});

connection.connect((err) => {
  if (err) {
    console.log("login error database connection");
    console.log(err);
  } else {
    console.log("login connected");
  }
});

//  body has nic and password
router.post("/", (req, res) => {
  console.log(req.body);
  body = req.body;
  const password = body.password;

  // check the employee already exist or not
  const getQuery =
    "select employee_id, password from accountmanagement.employees where nic = ? ;";

  // response has 3 field
  // error occur then error = true , otherwise error = false
  // exist => if the employee nic alredy regiterd exist = true else exist = false
  // employee regeister is sucess then sucess=true
  connection.query(getQuery, [body.nic], (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isError: true,
        isExist: false,
        error : err,
        result :result
      });
    } else {
      if (result.length == 0) {
        res.send({
          sucess: false,
          isError: false,
          isExist: false,
          error : err,
          result :result
        });
      } else {
        const employee_id = result[0].employee_id;
        const hash = result[0].password;

        bcrypt.compare(password, hash, function (err, result) {
          if (result) {
            // password is valid
            const sessionToken = generateSessionToken(employee_id);

            // Set the session token as an HTTP-only cookie
            res.cookie("sessionToken", sessionToken, {
              httpOnly: true,
              secure: false, // Enable this in a production environment with HTTPS
              sameSite: "Strict",
              maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
              path: "/", // Specify the path for which the cookie is valid
            });

            console.log(decodeUserId(sessionToken));
            res.send({
              sucess: true,
              isError: false,
              isExist: true,
              error : err,
              result :result
            });
          } else {
            res.send({
              sucess: false,
              isError: false,
              isExist: true,
              error : err,
              result :result
            });
          }
        });
      }
    }
  });
});

module.exports = router;
