drop table if exists Sellers cascade;
drop table if exists Buyers cascade;
drop table if exists Dishes cascade;
drop table if exists Orders cascade;

CREATE TABLE "public".Sellers
(
 pk_seller_id         serial PRIMARY KEY,
 seller_email         varchar(50) NOT NULL,
 password             varchar NOT NULL,
 seller_nickname      varchar(20) NOT NULL,
 seller_bio           varchar(50) NULL,
 kitchen_name         varchar(30) NOT NULL,
 pickup_window_start  time NOT NULL,
 pickup_window_end    time NOT NULL,
 seller_street_name   varchar(50) NOT NULL,
 seller_street_number integer NOT NULL,
 seller_city          varchar(20) NOT NULL,
 seller_zip_code      varchar(10) NOT NULL,
 UNIQUE (seller_email,kitchen_name),
 
);


CREATE TABLE "public".Buyers
(
 pk_buyer_id         serial PRIMARY KEY,
 buyer_email         varchar(50) NOT NULL,
 password            varchar NOT NULL,
 buyer_nickname      varchar(20) NOT NULL,
 buyer_street_name   varchar(30) NOT NULL,
 buyer_street_number integer NOT NULL,
 buyer_zip_code      varchar(10) NOT NULL,
 buyer_city          varchar(20) NOT NULL,
 UNIQUE (buyer_email),
);

CREATE TABLE "public".Dishes
(
 pk_dish_id         serial PRIMARY KEY,
 dish_name          varchar(50) NOT NULL,
 description        varchar(100) NOT NULL,
 price              money NOT NULL,
 quantity_available integer NULL,
 dish_photo_url     varchar NULL,
 fk_seller_id       serial NOT NULL,
 CONSTRAINT fk_seller_id
FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id") on delete cascade
);


CREATE TABLE "public".Orders
(
 pk_order_id       serial PRIMARY KEY,
 fk_seller_id      serial NOT NULL,
 fk_buyer_id       serial NOT NULL,
 fk_dish_id        serial NOT NULL,
 quantity_of_order integer NOT NULL,
 seller_confirm    boolean NOT NULL,
 buyer_confirm     boolean NOT NULL,

 CONSTRAINT fk_seller_id
 FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id")
 CONSTRAINT fk_buyer_id
 FOREIGN KEY ("fk_buyer_id") references Buyers("pk_buyer_id") 

);









