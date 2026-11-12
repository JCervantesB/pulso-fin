import Link from "next/link";
import { redirect } from "next/navigation";
import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { sugerencias, users, votos } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { cerrarSesion } from "@/app/actions/auth";
import { SelectorEstado } from "./selector-estado";

export const instant = false;

export const metadata = {
  title: "Pulso · Panel de administración",
};

const formatoFecha = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" });

export default async function AdminPage() {
  const sesion = await leerSesion();
  if (!sesion || sesion.role !== "administrador") {
    redirect("/");
  }

  const usuario = await db.select({ email: users.email }).from(users).where(eq(users.id, sesion.id));

  const filas = await db
    .select({
      id: sugerencias.id,
      titulo: sugerencias.titulo,
      estado: sugerencias.estado,
      createdAt: sugerencias.createdAt,
      autor: users.nombre,
    })
    .from(sugerencias)
    .innerJoin(users, eq(sugerencias.autorId, users.id))
    .orderBy(desc(sugerencias.createdAt));

  const conteos = await db
    .select({ sugerenciaId: votos.sugerenciaId, total: count() })
    .from(votos)
    .groupBy(votos.sugerenciaId);

  const totales = new Map(conteos.map((c) => [c.sugerenciaId, c.total]));

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">Pulso</Link>
            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white">Administración</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">Ver sugerencias</Link>
            <span className="text-slate-500">{usuario[0]?.email}</span>
            <form action={cerrarSesion}>
              <button type="submit" className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100">Cerrar sesión</button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sugerencias</h1>
          <p className="mt-1 text-sm text-slate-500">Cambia el estado de cada sugerencia. Los cambios se muestran al público de inmediato.</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Sugerencia</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Autor</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold text-slate-700">Votos</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">Todavía no hay sugerencias.</td>
                </tr>
              ) : (
                filas.map((fila) => (
                  <tr key={fila.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{fila.titulo}</p>
                      <p className="text-xs text-slate-500">{formatoFecha.format(fila.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{fila.autor}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">{totales.get(fila.id) ?? 0}</td>
                    <td className="px-4 py-3">
                      <SelectorEstado id={fila.id} titulo={fila.titulo} estadoInicial={fila.estado} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </>
  );
}
