-- create database acountmanagement
CREATE TABLE `accountmanagement`.`employee_type` (
  `type_id` CHAR(3) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`type_id`));


CREATE TABLE `accountmanagement`.`employees` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `employee_name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(300) NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `nic` VARCHAR(45) NOT NULL,
  `type_id` CHAR(3) NOT NULL,
  `age` INT NULL,
  PRIMARY KEY (`employee_id`),
  INDEX `type_id_idx` (`type_id` ASC) VISIBLE,
  CONSTRAINT `type_id`
    FOREIGN KEY (`type_id`)
    REFERENCES `accountmanagement`.`employee_type` (`type_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);



CREATE TABLE `accountmanagement`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(45) NOT NULL,
  `business_name` VARCHAR(45) NULL,
  `adress` VARCHAR(45) NOT NULL,
  `mobile` VARCHAR(15) NOT NULL,
  `lan_line` VARCHAR(45) NULL,
  `w_app_no` VARCHAR(45) NULL,
  `office_num` VARCHAR(45) NULL,
  `email_id` VARCHAR(45) NOT NULL,
  `nic_no` VARCHAR(45) NOT NULL,
  `created_date` DATETIME NULL,
  PRIMARY KEY (`customer_id`));


CREATE TABLE `accountmanagement`.`income_type` (
  `type_id` CHAR(2) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`type_id`));


CREATE TABLE `accountmanagement`.`cash_sales` (
  `invoice_id` INT NOT NULL AUTO_INCREMENT,
  `type_id` CHAR(2) NOT NULL,
  `manual_invoice_id` VARCHAR(20) NOT NULL,
  `date` DATETIME NULL,
  `customer_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `bill_amount` FLOAT NOT NULL,
  `discount` FLOAT NULL,
  PRIMARY KEY (`invoice_id`));
  
  CREATE TABLE accountmanagement.cash_sales (
  invoice_id INT NOT NULL AUTO_INCREMENT,
  type_id CHAR(2) NOT NULL,
  manual_invoice_id VARCHAR(45) NULL,
  date DATETIME NULL,
  customer_id int NULL,
  description VARCHAR(255) NULL,
  bill_amount FLOAT NOT NULL,
  discount FLOAT NULL,
  PRIMARY KEY (invoice_id),
    FOREIGN KEY (type_id)
    REFERENCES accountmanagement.income_type (type_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    FOREIGN KEY (customer_id)
    REFERENCES accountmanagement.customers(customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
  
  CREATE TABLE accountmanagement.credit_sales (
  invoice_id INT NOT NULL AUTO_INCREMENT,
  type_id CHAR(2) NOT NULL,
  manual_invoice_id VARCHAR(45) NULL,
  date DATETIME NULL,
  customer_id int NOT NULL,
  description VARCHAR(255) NULL,
  bill_amount FLOAT NOT NULL,
  discount FLOAT NULL,
  PRIMARY KEY (invoice_id),
 
FOREIGN KEY (type_id)
REFERENCES accountmanagement.income_type (type_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
    
 FOREIGN KEY (customer_id)
REFERENCES accountmanagement.customers(customer_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);




CREATE TABLE accountmanagement.advance_sales_ap (
  invoice_id INT NOT NULL AUTO_INCREMENT,
  type_id CHAR(2) NOT NULL,
  manual_invoice_id VARCHAR(45) NULL,
  date DATETIME NULL,
  customer_id int NOT NULL,
  description VARCHAR(255) NULL,
  bill_amount FLOAT NOT NULL,
  advance_amount FLOAT NOT NULL,
  discount FLOAT NULL,
  PRIMARY KEY (invoice_id),
 
FOREIGN KEY (type_id)
REFERENCES accountmanagement.income_type (type_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
    
 FOREIGN KEY (customer_id)
REFERENCES accountmanagement.customers(customer_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);

CREATE TABLE accountmanagement.advance_sales_BP (
  invoice_id INT NOT NULL AUTO_INCREMENT,
  type_id CHAR(2) NOT NULL,
  return_payment boolean,
  manual_invoice_id VARCHAR(45) NULL,
  date DATETIME NULL,
  customer_id int NOT NULL,
  description VARCHAR(255) NULL,
  bill_amount FLOAT NOT NULL,
  advance_amount FLOAT NOT NULL,
  discount FLOAT NULL,
  PRIMARY KEY (invoice_id),
 
FOREIGN KEY (type_id)
REFERENCES accountmanagement.income_type (type_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
    
 FOREIGN KEY (customer_id)
REFERENCES accountmanagement.customers(customer_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);



CREATE TABLE accountmanagement.expenses (
  expense_id INT NOT NULL AUTO_INCREMENT,
  type varchar(255) NOT NULL,
  manual_expense_id VARCHAR(45) NULL,
  date DATETIME NULL,
  description VARCHAR(255) NULL,
  net_total float not null,
  employee_id int not null,
  PRIMARY KEY (expense_id),
 

 FOREIGN KEY (employee_id)
REFERENCES accountmanagement.employees(employee_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);













ALTER TABLE `accountmanagement`.`credit_sales` 
ADD COLUMN `employee_id` INT NOT NULL AFTER `discount`,
ADD INDEX `credit_sales_ibfk_3_idx` (`employee_id` ASC) VISIBLE;
;
ALTER TABLE `accountmanagement`.`credit_sales` 
ADD CONSTRAINT `credit_sales_ibfk_3`
  FOREIGN KEY (`employee_id`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
  

ALTER TABLE `accountmanagement`.`cash_sales` 
ADD COLUMN `employee_id` INT NOT NULL AFTER `discount`,
ADD INDEX `cash_sales_ibfk_3_idx` (`employee_id` ASC) VISIBLE;
;
ALTER TABLE `accountmanagement`.`cash_sales` 
ADD CONSTRAINT `cash_sales_ibfk_3`
  FOREIGN KEY (`employee_id`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  ALTER TABLE `accountmanagement`.`advance_sales_bp` 
ADD COLUMN `employee_id` INT NOT NULL AFTER `discount`,
ADD INDEX `advance_sales_bp_ibfk_3_idx` (`employee_id` ASC) VISIBLE;
;
ALTER TABLE `accountmanagement`.`advance_sales_bp` 
ADD CONSTRAINT `advance_sales_bp_ibfk_3`
  FOREIGN KEY (`employee_id`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


CREATE INDEX idx_credit_sales_invoice_type ON accountmanagement.credit_sales (invoice_id, type_id);

ALTER TABLE `accountmanagement`.`advance_sales_ap` ADD INDEX `idx_invoice_type` (`invoice_id`, `type_id`);

CREATE INDEX idx_advance_sales_bp_invoice_type
ON accountmanagement.advance_sales_bp (invoice_id, type_id);

CREATE TABLE `accountmanagement`.`credit_partial_settle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` CHAR(3) NULL,
  `invoice_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `description` VARCHAR(400) NULL,
  `customer_id` INT NOT NULL,
  `settle_amount` FLOAT NOT NULL,
  `balance` FLOAT NULL,
  `employee_id` INT NULL,
  PRIMARY KEY (`id`),
  
  FOREIGN KEY (`employee_id`)
    REFERENCES `accountmanagement`.`employees` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    
  FOREIGN KEY (`customer_id`)
    REFERENCES `accountmanagement`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    
  FOREIGN KEY (`invoice_id` , `type`)
    REFERENCES `accountmanagement`.`credit_sales` (`invoice_id` , `type_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    
  FOREIGN KEY (`invoice_id` , `type`)
    REFERENCES `accountmanagement`.`advance_sales_ap` (`invoice_id` , `type_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    
  FOREIGN KEY (`invoice_id` , `type`)
    REFERENCES `accountmanagement`.`advance_sales_bp` (`invoice_id` , `type_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);


ALTER TABLE `accountmanagement`.`advance_sales_ap` 
ADD COLUMN `employee_id` INT NOT NULL;

ALTER TABLE `accountmanagement`.`advance_sales_ap` 
ADD CONSTRAINT `advance_sales_ap_ibfk_10`
  FOREIGN KEY (`employee_id`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE `accountmanagement`.`customers` 
ADD COLUMN `employee_id` INT NOT NULL;

ALTER TABLE `accountmanagement`.`customers` 
ADD CONSTRAINT `customers_ibfk_10`
  FOREIGN KEY (`employee_id`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;