CREATE TABLE "users" (
	"Todo_Id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_Todo_Id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Todos" text NOT NULL,
	"Complete_status" boolean DEFAULT false,
	"Created_At" timestamp DEFAULT now() NOT NULL
);
