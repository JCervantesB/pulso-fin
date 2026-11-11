import Link from "next/link";

export const metadata = {
  title: "Pulso · Crear cuenta",
};

export default function RegistroPage() {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">Pulso</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">Sugerencias</Link>
            <Link href="/login" className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100">Iniciar sesión</Link>
          </nav>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Crear cuenta</h1>
            <p className="mt-1 text-sm text-slate-500">Regístrate para proponer ideas y votar las de otros.</p>

            <form id="formulario-registro" className="mt-6 space-y-5" noValidate>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Cómo te verán los demás"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label htmlFor="contrasena" className="block text-sm font-medium text-slate-700">Contraseña</label>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
                <p className="mt-1 text-xs text-slate-500">Mínimo 8 caracteres.</p>
              </div>

              <p id="mensaje-error" role="alert" className="hidden rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"></p>

              <button
                type="submit"
                className="w-full rounded-lg bg-sky-600 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Crear cuenta
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-medium text-sky-700 hover:underline">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
