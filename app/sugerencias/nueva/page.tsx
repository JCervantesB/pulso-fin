import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { cerrarSesion } from "@/app/actions/auth";

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

      <main className="mx-auto max-w-2xl px-4 py-10">
        <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">← Volver a sugerencias</Link>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Nueva sugerencia</h1>
          <p className="mt-1 text-sm text-slate-500">Describe una idea concreta. Otras personas podrán leerla y votarla.</p>

          <form id="formulario-sugerencia" className="mt-6 space-y-5" noValidate>
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-slate-700">Título</label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                maxLength={120}
                placeholder="Una frase que resuma la idea"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={5}
                placeholder="¿Qué problema resuelve? ¿Cómo imaginas que funcionaría?"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              ></textarea>
            </div>

            <p id="mensaje-error" role="alert" className="hidden rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"></p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancelar</Link>
              <button
                type="submit"
                className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Enviar sugerencia
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
