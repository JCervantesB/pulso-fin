export type ValidacionSugerencia =
  | { ok: true; titulo: string; descripcion: string }
  | { ok: false; error: string };

export function validarSugerencia(titulo: string, descripcion: string): ValidacionSugerencia {
  const tituloLimpio = titulo.trim();
  const descripcionLimpia = descripcion.trim();

  if (!tituloLimpio) {
    return { ok: false, error: "El título no puede estar vacío." };
  }
  if (tituloLimpio.length > 120) {
    return { ok: false, error: "El título no puede superar los 120 caracteres." };
  }
  if (!descripcionLimpia) {
    return { ok: false, error: "La descripción no puede estar vacía." };
  }
  if (descripcionLimpia.length > 1000) {
    return { ok: false, error: "La descripción no puede superar los 1000 caracteres." };
  }

  return { ok: true, titulo: tituloLimpio, descripcion: descripcionLimpia };
}
