import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["usuario", "administrador"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("usuario"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const estadoEnum = pgEnum("estado", ["pendiente", "en_desarrollo", "completada"]);

export const sugerencias = pgTable("sugerencias", {
  id: serial("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descripcion: text("descripcion").notNull(),
  autorId: integer("autor_id")
    .notNull()
    .references(() => users.id),
  estado: estadoEnum("estado").notNull().default("pendiente"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const votos = pgTable(
  "votos",
  {
    id: serial("id").primaryKey(),
    sugerenciaId: integer("sugerencia_id")
      .notNull()
      .references(() => sugerencias.id, { onDelete: "cascade" }),
    usuarioId: integer("usuario_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (tabla) => [uniqueIndex("votos_sugerencia_usuario_unico").on(tabla.sugerenciaId, tabla.usuarioId)],
);
