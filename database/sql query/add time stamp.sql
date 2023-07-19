ALTER TABLE advance_sales_ap 
  modify COLUMN date TIMESTAMP  not null DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE advance_sales_bp 
  modify COLUMN date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE cash_sales 
  modify COLUMN date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE credit_partial_settle 
  modify COLUMN date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE credit_sales 
  modify COLUMN date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE customers 
  modify COLUMN created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE expenses 
  modify COLUMN date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  
  
-- add updated time stamp

ALTER TABLE advance_sales_ap 
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `advance_sales_ap_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE advance_sales_bp 
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `advance_sales_bp_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE cash_sales 
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `cash_sales_ap_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE credit_partial_settle
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `credit_partial_settle_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE credit_sales
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `credit_sales_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE customers
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `customers_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
  
ALTER TABLE expenses
  ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  add column updated_by int ,
  ADD CONSTRAINT `expenses_ibfk_11`
  FOREIGN KEY (`updated_by`)
  REFERENCES `accountmanagement`.`employees` (`employee_id`)
  ON DELETE NO ACTION
  ON UPDATE cascade;
