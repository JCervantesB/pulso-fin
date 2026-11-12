import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { cerrarSesion } from "@/app/actions/auth";
import NuevaSugerenciaForm from "./form";

export const instant = false;

export const metadata = {
  title: "Pulso · Nueva sugerencia",
};

export default async function NuevaSugerenciaPage() {
  const sesion = await leerSesion();
  if (!sesion) {
    redirect("/login");
  }

  const usuario = await db.select({ email: users.email }).from(users).where(eq(users.id, sesion.id));

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">Pulso</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">Sugerencias</Link>
            <span className="text-slate-500">{usuario[0]?.email}</span>
            <form action={cerrarSesion}>
              <button type="submit" className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100">Cerrar sesión</button>
            </form>
          </nav>
        </div>
      </header>

      <NuevaSugerenciaForm />
    </>
  );
}
