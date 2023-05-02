-- Create dabase tables samples for this repository
    -- {
    --   id: 1,
    --   produuctname: 'iphone',
    --   description: 'completed'
    -- }    
CREATE or REPLACE TABLE PRODUCTS (
    id INT NOT NULL AUTO_INCREMENT,
    productname VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)        
);

-- Path: DB.sql

