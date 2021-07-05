-- Table: public.dinner
-- DROP TABLE public.dinner;
CREATE TABLE IF NOT EXISTS public.dinner
(
    id text COLLATE pg_catalog."default" NOT NULL,
    picture bytea,
    name text COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default",
    CONSTRAINT dinner_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.dinner
    OWNER to postgres;

-----------------------------------------------------------

-- Table: public.working_hours
-- DROP TABLE public.working_hours;
CREATE TABLE IF NOT EXISTS public.working_hours
(
    id text COLLATE pg_catalog."default" NOT NULL,
    dinner text COLLATE pg_catalog."default" NOT NULL,
    weekday integer NOT NULL,
    open text COLLATE pg_catalog."default" NOT NULL,
    close text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT working_hours_pkey PRIMARY KEY (id),
    CONSTRAINT dinner_fk FOREIGN KEY (dinner)
        REFERENCES public.dinner (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE public.working_hours
    OWNER to postgres;

-----------------------------------------------------------
-----------------------------------------------------------
-----------------------------------------------------------
-----------------------------------------------------------
-----------------------------------------------------------
