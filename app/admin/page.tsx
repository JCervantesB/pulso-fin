import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { leerSesion } from "@/lib/auth/cookies";
import { cerrarSesion } from "@/app/actions/auth";

export const instant = false;

export const metadata = {
  title: "Pulso · Panel de administración",
};

const selectClase =
  "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30";

export default async function AdminPage() {
  const sesion = await leerSesion();
  if (!sesion || sesion.role !== "administrador") {
    redirect("/");
  }

  const usuario = await db.select({ email: users.email }).from(users).where(eq(users.id, sesion.id));

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

              <tr>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">Modo oscuro en toda la aplicación</p>
                  <p className="text-xs text-slate-500">3 de noviembre de 2026</p>
                </td>
                <td className="px-4 py-3 text-slate-600">Ana Torres</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">12</td>
                <td className="px-4 py-3">
                  <select aria-label="Estado de Modo oscuro" className={selectClase} defaultValue="En desarrollo">
                    <option>Pendiente</option>
                    <option>En desarrollo</option>
                    <option>Completada</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">Exportar sugerencias a CSV</p>
                  <p className="text-xs text-slate-500">1 de noviembre de 2026</p>
                </td>
                <td className="px-4 py-3 text-slate-600">Luis Pérez</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">7</td>
                <td className="px-4 py-3">
                  <select aria-label="Estado de Exportar sugerencias a CSV" className={selectClase} defaultValue="Pendiente">
                    <option>Pendiente</option>
                    <option>En desarrollo</option>
                    <option>Completada</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">Notificar cuando una idea cambie de estado</p>
                  <p className="text-xs text-slate-500">28 de octubre de 2026</p>
                </td>
                <td className="px-4 py-3 text-slate-600">Marta Ruiz</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">3</td>
                <td className="px-4 py-3">
                  <select aria-label="Estado de Notificar cuando una idea cambie de estado" className={selectClase} defaultValue="Completada">
                    <option>Pendiente</option>
                    <option>En desarrollo</option>
                    <option>Completada</option>
                  </select>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </main>
    </>
  );
}
