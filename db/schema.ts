import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["usuario", "administrador"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("usuario"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
