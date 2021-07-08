-- Table: public.restaurant
-- DROP TABLE public.restaurant;
CREATE TABLE IF NOT EXISTS public.restaurant
(
  id text COLLATE pg_catalog."default" NOT NULL,
  picture text,
  name text COLLATE pg_catalog."default" NOT NULL,
  address text COLLATE pg_catalog."default",
  CONSTRAINT restaurant_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.restaurant
OWNER to postgres;

-----------------------------------------------------------

-- Table: public.working_hour
-- DROP TABLE public.working_hour;
CREATE TABLE IF NOT EXISTS public.working_hour
(
  id text COLLATE pg_catalog."default" NOT NULL,
  restaurant text COLLATE pg_catalog."default" NOT NULL,
  weekday integer NOT NULL,
  open text COLLATE pg_catalog."default" NOT NULL,
  close text COLLATE pg_catalog."default" NOT NULL,
  CONSTRAINT working_hour_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_fk FOREIGN KEY (restaurant)
  REFERENCES public.restaurant (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE public.working_hour
OWNER to postgres;

-----------------------------------------------------------

-- Table: public.product
-- DROP TABLE public.product;
CREATE TABLE IF NOT EXISTS public.product
(
  id text COLLATE pg_catalog."default" NOT NULL,
  restaurant text COLLATE pg_catalog."default" NOT NULL,
  picture text,
  name text COLLATE pg_catalog."default" NOT NULL,
  price NUMERIC(2) NOT NULL,
  category text COLLATE pg_catalog."default" NOT NULL,
  in_promotion BOOLEAN NOT NULL DEFAULT FALSE,
  promotion_description text COLLATE pg_catalog."default",
  promotion_price NUMERIC(2),
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT restaurant_fk FOREIGN KEY (restaurant)
  REFERENCES public.restaurant (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE public.product
OWNER to postgres;
-----------------------------------------------------------

-- Table: public.product_promotion_hour
-- DROP TABLE public.product_promotion_hour;
CREATE TABLE IF NOT EXISTS public.product_promotion_hour
(
  id text COLLATE pg_catalog."default" NOT NULL,
  product text COLLATE pg_catalog."default" NOT NULL,
  weekday integer NOT NULL,
  open text COLLATE pg_catalog."default" NOT NULL,
  close text COLLATE pg_catalog."default" NOT NULL,
  CONSTRAINT product_promotion_hour_pkey PRIMARY KEY (id),
  CONSTRAINT product_fk FOREIGN KEY (product)
  REFERENCES public.product (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE public.product_promotion_hour
OWNER to postgres;
