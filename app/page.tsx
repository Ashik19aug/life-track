export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 text-slate-950">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold tracking-[0.2em] text-emerald-700 uppercase">
          LifeTrack
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Your life, organized.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          A secure foundation for your productivity, health, and lifestyle.
        </p>
        <div className="mt-10 rounded-xl bg-slate-50 p-5">
          <h2 className="text-sm font-semibold text-slate-900">System Status</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-600">Application</dt>
              <dd className="font-medium text-emerald-700">Running</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-600">Database</dt>
              <dd className="font-medium text-slate-700">
                Check <code className="rounded bg-slate-200 px-1.5 py-0.5">/api/health</code>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
