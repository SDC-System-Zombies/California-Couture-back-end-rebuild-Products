/*
Use this command line to create the database first in terminal
CREATE DATABASE atelier WITH OWNER = hrvy ENCODING = 'UTF8';

then run this file with the command:
psql -d atelier -a -f schema.sql

to create the tables within that database
*/


CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slogan VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(200) NOT NULL,
  default_price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(200) NOT NULL,
  value VARCHAR(200),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS related (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  related_id INT NOT NULL,
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS styles (
  style_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  sale_price VARCHAR(20),
  original_price INT NOT NULL,
  default? BOOLEAN,
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  photos_id INT,
  style_id INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES styles(style_id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  size VARCHAR(10),
  quantity SMALLINT NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES styles(style_id)
);

-- import CSV files statements

COPY products
FROM '/Users/vytran/Downloads/product.csv'
DELIMITER ','
CSV HEADER;

COPY features
FROM '/Users/vytran/Downloads/features.csv'
DELIMITER ','
CSV HEADER;

COPY related
FROM '/Users/vytran/Downloads/related.csv'
DELIMITER ','
CSV HEADER;

COPY styles
FROM '/Users/vytran/Downloads/styles.csv'
DELIMITER ','
CSV HEADER;

COPY photos(photos_id, style_id, url, thumbnail_url)
FROM '/Users/vytran/Downloads/photos.csv'
DELIMITER ','
CSV HEADER;

-- the id column of the csv hit a duplicate id
-- since the PK needs to be unique and we don't use this id column in our data
-- i just dropped it..
ALTER TABLE photos
DROP COLUMN photos_id;

-- due to some formatting issues within the photos id
-- I also deleted the records where the thumbnail_url was incorrect
DELETE FROM photos WHERE thumbnail_url LIKE '%,http%';

COPY skus
FROM '/Users/vytran/Downloads/skus.csv'
DELIMITER ','
CSV HEADER;

-- create indexes

CREATE INDEX style_prod_index ON styles(product_id);
CREATE INDEX photo_style_index ON photos(style_id);
CREATE INDEX sku_style_index ON skus(style_id);
CREATE INDEX features_prod_index ON features(product_id);
CREATE INDEX related_prod_index ON related(product_id);
