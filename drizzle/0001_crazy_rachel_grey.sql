CREATE TYPE "public"."estado" AS ENUM('pendiente', 'en_desarrollo', 'completada');--> statement-breakpoint
CREATE TABLE "sugerencias" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"descripcion" text NOT NULL,
	"autor_id" integer NOT NULL,
	"estado" "estado" DEFAULT 'pendiente' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sugerencias" ADD CONSTRAINT "sugerencias_autor_id_users_id_fk" FOREIGN KEY ("autor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;