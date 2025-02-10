CREATE TABLE "students" (
	"id" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"programme" text NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
