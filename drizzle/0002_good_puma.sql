CREATE TABLE "votos" (
	"id" serial PRIMARY KEY NOT NULL,
	"sugerencia_id" integer NOT NULL,
	"usuario_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "votos" ADD CONSTRAINT "votos_sugerencia_id_sugerencias_id_fk" FOREIGN KEY ("sugerencia_id") REFERENCES "public"."sugerencias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votos" ADD CONSTRAINT "votos_usuario_id_users_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "votos_sugerencia_usuario_unico" ON "votos" USING btree ("sugerencia_id","usuario_id");