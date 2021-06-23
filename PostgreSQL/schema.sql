DROP DATABASE IF EXISTS atelier;

CREATE DATABASE atelier
WITH
  OWNER = vytran
  ENCODING = 'UTF8';

USE atelier;

CREATE TABLE IF NOT EXISTS products (
  productId SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slogan VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(200) NOT NULL,
  default_price SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  feature VARCHAR(200) NOT NULL,
  value VARCHAR(200),
  CONSTRAINT fk_product
    FOREIGN KEY(productId)
      REFERENCES products(productId)
);

CREATE TABLE IF NOT EXISTS related (
  id SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  relatedId INT NOT NULL,
  CONSTRAINT fk_product
    FOREIGN KEY(productId)
      REFERENCES products(productId)
);

CREATE TABLE IF NOT EXISTS styles (
  styleId SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  sale_price SMALLINT,
  original_price SMALLINT NOT NULL,
  default_style BOOLEAN,
  CONSTRAINT fk_product
    FOREIGN KEY(productId)
      REFERENCES products(productId)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(styleId)
      REFERENCES styles(styleId)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  size VARCHAR(10),
  quantity SMALLINT NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(styleId)
      REFERENCES styles(styleId)
);

