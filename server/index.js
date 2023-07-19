var http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const employee = require('./routerComponent/pages/employee');
const customer = require('./routerComponent/pages/customer');
const cashSale = require('./routerComponent/pages/cashSale');
const creditSale = require('./routerComponent/pages/creditSale');
const advanceSaleAfterProduct = require('./routerComponent/pages/advanceSaleAfterProduct');
const advanceSaleBeforProduct = require('./routerComponent/pages/advanceSaleBeforeProduct');
const dashboard = require('./routerComponent//pages/dashboard');
const login = require('./routerComponent/Authentication/login');



server = http.createServer ((req, res)=> {
  res.setHeader('Content-Type', 'text/plain');
})

// Set up body parsing middleware
app.use(express.json());

app.use('/employee', employee);
app.use('/customer', customer);
app.use('/cashSale', cashSale);
app.use('/creditSale', creditSale);
app.use('/advanceSaleAP', advanceSaleAfterProduct);
app.use('/advanceSaleBP', advanceSaleBeforProduct);
app.use('/dashboard', dashboard);
app.use('/login',login);

app.listen(5000, () => {
    console.log("Listen port 5000");
  });

  