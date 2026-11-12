import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { sugerencias, users } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { cerrarSesion } from "@/app/actions/auth";

export const instant = false;

export const metadata = {
  title: "Pulso · Sugerencias",
};

type Estado = "pendiente" | "en_desarrollo" | "completada";

const etiquetaEstado: Record<Estado, { texto: string; clases: string }> = {
  pendiente: { texto: "Pendiente", clases: "bg-slate-100 text-slate-700" },
  en_desarrollo: { texto: "En desarrollo", clases: "bg-amber-100 text-amber-800" },
  completada: { texto: "Completada", clases: "bg-emerald-100 text-emerald-800" },
};

const formatoFecha = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" });

export default async function SugerenciasPage() {
  const sesion = await leerSesion();
  const usuario = sesion
    ? await db.select({ email: users.email }).from(users).where(eq(users.id, sesion.id))
    : [];

  const filas = await db
    .select({
      id: sugerencias.id,
      titulo: sugerencias.titulo,
      descripcion: sugerencias.descripcion,
      estado: sugerencias.estado,
      createdAt: sugerencias.createdAt,
      autor: users.nombre,
    })
    .from(sugerencias)
    .innerJoin(users, eq(sugerencias.autorId, users.id))
    .orderBy(desc(sugerencias.createdAt));

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

        {filas.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-medium text-slate-900">Todavía no hay sugerencias</p>
            <p className="mt-1 text-sm text-slate-500">Sé la primera persona en proponer una idea.</p>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {filas.map((fila) => {
              const estado = etiquetaEstado[fila.estado as Estado];
              return (
                <li key={fila.id} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-slate-100 py-2">
                    <span className="text-lg font-bold text-slate-900">0</span>
                    <span className="text-xs text-slate-500">votos</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-slate-900">{fila.titulo}</h2>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${estado.clases}`}>{estado.texto}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{fila.descripcion}</p>
                    <p className="mt-2 text-xs text-slate-400">{fila.autor} · {formatoFecha.format(fila.createdAt)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

      </main>
    </>
  );
}
