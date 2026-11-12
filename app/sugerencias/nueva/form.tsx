"use client";

import Link from "next/link";
import { useActionState } from "react";
import { crearSugerencia } from "@/app/actions/sugerencias";

const estadoInicial = { error: undefined as string | undefined };

export default function NuevaSugerenciaForm() {
  const [estado, accion, pendiente] = useActionState(crearSugerencia, estadoInicial);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-sky-700 hover:underline">← Volver a sugerencias</Link>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Nueva sugerencia</h1>
        <p className="mt-1 text-sm text-slate-500">Describe una idea concreta. Otras personas podrán leerla y votarla.</p>

        <form action={accion} className="mt-6 space-y-5" noValidate>
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

          {estado.error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{estado.error}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancelar</Link>
            <button
              type="submit"
              disabled={pendiente}
              className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-60"
            >
              Enviar sugerencia
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
