export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/20">
              M
            </div>
            <div>
              <span className="text-lg font-semibold tracking-tight text-white">
                OpenMad
              </span>
              <span className="ml-2 rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400 border border-indigo-500/20">
                Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistema Activo
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 sm:p-8 shadow-xl">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Panel de Administracion y Gestion
          </h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-400">
            Gestion centralizada de catalogos, tramites academicos, requisitos y configuracion institucional para la Universidad Nacional Amazonica de Madre de Dios.
          </p>
        </div>

        {/* Quick Management Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 transition-all hover:border-slate-700 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Tramites Academicos</h2>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">Catalogo</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Administracion de modalidades, costos, pasos y normativas asociadas a tramites universitarios.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Configurar Tramites
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 transition-all hover:border-slate-700 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Requisitos y Formularios</h2>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">Documentacion</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Mapeo de requerimientos obligatorios, formatos descargables y validaciones por dependencia.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Gestionar Requisitos
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 transition-all hover:border-slate-700 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Estructura Universitaria</h2>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">Facultades</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Mantenimiento de facultades, escuelas profesionales y dependencias academicas UNAMAD.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Ver Estructura
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
