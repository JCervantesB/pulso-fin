"use client";

import { useState, useTransition } from "react";
import { cambiarEstado } from "@/app/actions/estado";

const selectClase =
  "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30";

const OPCIONES = [
  { valor: "pendiente", texto: "Pendiente" },
  { valor: "en_desarrollo", texto: "En desarrollo" },
  { valor: "completada", texto: "Completada" },
] as const;

export function SelectorEstado({
  id,
  titulo,
  estadoInicial,
}: {
  id: number;
  titulo: string;
  estadoInicial: string;
}) {
  const [estado, setEstado] = useState(estadoInicial);
  const [pendiente, startTransition] = useTransition();

  return (
    <select
      aria-label={`Estado de ${titulo}`}
      className={selectClase}
      value={estado}
      disabled={pendiente}
      onChange={(evento) => {
        const nuevo = evento.target.value;
        setEstado(nuevo);
        startTransition(async () => {
          await cambiarEstado(id, nuevo);
        });
      }}
    >
      {OPCIONES.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  );
}
