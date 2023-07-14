var http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const employee = require('./routerComponent/employee');
const customer = require('./routerComponent/customer');
const cashSale = require('./routerComponent/cashSale');
const creditSale = require('./routerComponent/creditSale');
const advanceSaleAfterProduct = require('./routerComponent/advanceSaleAfterProduct');
const advanceSaleBeforProduct = require('./routerComponent/advanceSaleBeforeProduct');
const dashboard = require('./routerComponent/dashboard');


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

app.listen(5000, () => {
    console.log("Listen port 5000");
  });

  