export default function Home() {
  const membres = ["Florence", "Alexandre", "Nicolas", "Caroline", "Seyun"];

  return (
    <main className="min-h-screen bg-[#fff8ef] px-6 py-10 text-[#2b2118]">
      <section className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <h1 className="text-4xl font-bold">À Table !</h1>
          <p className="mt-3 text-lg text-[#6f5b48]">
            Le planning familial des repas
          </p>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Qui êtes-vous ?</h2>

          <div className="space-y-3">
            {membres.map((membre) => (
              <button
                key={membre}
                className="w-full rounded-2xl border border-[#ead8c3] bg-[#fffaf3] px-5 py-4 text-left text-lg font-medium shadow-sm transition hover:bg-[#f6eadb]"
              >
                {membre}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}