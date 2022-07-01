drop table if exists users cascade;
drop table if exists subusers cascade;

CREATE TABLE public.users (
	"_id" serial PRIMARY KEY,
	"username" varchar NOT NULL,
	"hashed_pass" varchar NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.subusers (
	"_id" serial PRIMARY KEY,
	"sub_name" varchar NOT NULL,
	"family_id" bigint NOT NULL,
	CONSTRAINT fk_users
	FOREIGN KEY ("family_id") references users("_id") on delete cascade
) WITH (
  OIDS=FALSE
);




CREATE TABLE "public".Orders
(
 pk_order_id       serial PRIMARY KEY NOT NULL,
 fk_seller_id      serial NOT NULL,
 fk_buyer_id       serial NOT NULL,
 fk_dish_id        serial NOT NULL,
 quantity_of_order integer NOT NULL,
 seller_confirm    boolean NOT NULL,
 buyer_confirm     boolean NOT NULL,

 CONSTRAINT pk_order_id
 FOREIGN KEY ("fk_seller_id") references Sellers("pk_seller_id") on delete cascade
);

CREATE TABLE "public".Buyers
(
 pk_buyer_id         serial PRIMARY KEY NOT NULL,
 buyer_email         varchar(50) NOT NULL,
 password            varchar(50) NOT NULL,
 buyer_nickname      varchar(20) NOT NULL,
 buyer_address       varchar(50) NOT NULL,
 buyer_street_name   varchar(30) NOT NULL,
 buyer_street_number integer NOT NULL,
 buyer_zip_code      varchar(10) NOT NULL,
 buyer_city          varchar(20) NOT NULL,
 UNIQUE (buyer_email),
 CONSTRAINT PK_6 PRIMARY KEY ( pk_buyer_id )
);



CREATE TABLE "public".Dishes
(
 pk_dish_id         serial PRIMARY KEY NOT NULL,
 dish_name          varchar(50) NOT NULL,
 description        varchar(100) NOT NULL,
 price              money NOT NULL,
 quantity_available integer NULL,
 dish_photo_url     varchar NULL,
 fk_seller_id       serial NOT NULL,
 CONSTRAINT PK_25 PRIMARY KEY ( pk_dish_id )
);


CREATE TABLE "public".Sellers
(
 pk_seller_id         serial PRIMARY KEY NOT NULL,
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
 CONSTRAINT PK_7 PRIMARY KEY ( pk_seller_id )
);

