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