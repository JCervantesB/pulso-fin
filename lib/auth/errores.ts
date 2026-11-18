const CODIGO_CORREO_DUPLICADO = "23505";
const RESTRICCION_CORREO = "users_email_unique";

export function esCorreoDuplicado(error: unknown): boolean {
  let actual: unknown = error;
  for (let profundidad = 0; profundidad < 5 && actual; profundidad++) {
    const { code, constraint_name, cause } = actual as {
      code?: string;
      constraint_name?: string;
      cause?: unknown;
    };
    if (code === CODIGO_CORREO_DUPLICADO && (constraint_name === undefined || constraint_name === RESTRICCION_CORREO)) {
      return true;
    }
    actual = cause;
  }
  return false;
}
