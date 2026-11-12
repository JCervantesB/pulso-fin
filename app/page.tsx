import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { cerrarSesion } from "@/app/actions/auth";

export const instant = false;

export const metadata = {
  title: "Pulso · Sugerencias",
};

export default async function SugerenciasPage() {
  const sesion = await leerSesion();
  const usuario = sesion
    ? await db.select({ email: users.email }).from(users).where(eq(users.id, sesion.id))
    : [];

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">Pulso</Link>
          <nav className="flex items-center gap-4 text-sm">
            {sesion ? (
              <>
                <span className="text-slate-500">{usuario[0]?.email}</span>
                <form action={cerrarSesion}>
                  <button type="submit" className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100">Cerrar sesión</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-slate-900">Iniciar sesión</Link>
                <Link href="/registro" className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100">Registrarse</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sugerencias</h1>
            <p className="mt-1 text-sm text-slate-500">Ideas propuestas por la comunidad. Cualquier visitante puede leerlas.</p>
          </div>
          <Link href="/sugerencias/nueva"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
          >
            Nueva sugerencia
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Para enviar una sugerencia necesitas <Link href="/login" className="font-medium text-sky-700 hover:underline">iniciar sesión</Link>.
        </p>

        <ul className="mt-8 space-y-4">

          <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-slate-100 py-2">
              <span className="text-lg font-bold text-slate-900">12</span>
              <span className="text-xs text-slate-500">votos</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">Modo oscuro en toda la aplicación</h2>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">En desarrollo</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">Me gustaría poder usar la aplicación de noche sin cegarme con el fondo blanco.</p>
              <p className="mt-2 text-xs text-slate-400">Ana Torres · 3 de noviembre de 2026</p>
            </div>
            <div className="flex shrink-0 items-start">
              <button type="button" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100">Votar</button>
            </div>
          </li>

          <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-slate-100 py-2">
              <span className="text-lg font-bold text-slate-900">7</span>
              <span className="text-xs text-slate-500">votos</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">Exportar sugerencias a CSV</h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">Pendiente</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">Para llevar la lista a una hoja de cálculo y priorizar con el equipo.</p>
              <p className="mt-2 text-xs text-slate-400">Luis Pérez · 1 de noviembre de 2026</p>
            </div>
            <div className="flex shrink-0 items-start">
              <button type="button" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100">Votar</button>
            </div>
          </li>

          <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-slate-100 py-2">
              <span className="text-lg font-bold text-slate-900">3</span>
              <span className="text-xs text-slate-500">votos</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">Notificar cuando una idea cambie de estado</h2>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Completada</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">Quiero enterarme cuando una sugerencia que voté se publique o se complete.</p>
              <p className="mt-2 text-xs text-slate-400">Marta Ruiz · 28 de octubre de 2026</p>
            </div>
            <div className="flex shrink-0 items-start">
              <button type="button" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100">Votar</button>
            </div>
          </li>

        </ul>

        <div className="mt-10 hidden rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center" id="estado-vacio">
          <p className="font-medium text-slate-900">Todavía no hay sugerencias</p>
          <p className="mt-1 text-sm text-slate-500">Sé la primera persona en proponer una idea.</p>
        </div>

      </main>
    </>
  );
}
