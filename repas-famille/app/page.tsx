"use client";

import { useState } from "react";

const membres = ["Florence", "Alexandre", "Nicolas", "Caroline", "Seyun"];

export default function Home() {
  const [membre, setMembre] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  function choisirMembre(nom: string) {
    setMembre(nom);
    setCode("");
    setMessage("");
  }

  function validerCode() {
    if (!/^\d{4}$/.test(code)) {
      setMessage("Le code doit contenir exactement 4 chiffres.");
      return;
    }

    const cle = `code-${membre}`;
    const codeEnregistre = localStorage.getItem(cle);

    if (!codeEnregistre) {
      localStorage.setItem(cle, code);
      localStorage.setItem("membre-connecte", membre);
      setMessage(`Code créé. Bienvenue ${membre} !`);
      return;
    }

    if (code === codeEnregistre) {
      localStorage.setItem("membre-connecte", membre);
      setMessage(`Bienvenue ${membre} !`);
    } else {
      setMessage("Code incorrect.");
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8ef] px-6 py-10 text-[#2b2118]">
      <section className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">🍽️</div>
          <h1 className="text-4xl font-bold">À Table !</h1>
          <p className="mt-3 text-lg text-[#6f5b48]">
            Le planning familial des repas
          </p>
        </div>

        {!membre ? (
          <div className="rounded-3xl bg-white p-5 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Qui êtes-vous ?</h2>

            <div className="space-y-3">
              {membres.map((nom) => (
                <button
                  key={nom}
                  onClick={() => choisirMembre(nom)}
                  className="w-full rounded-2xl border border-[#ead8c3] bg-[#fffaf3] px-5 py-4 text-left text-lg font-medium shadow-sm transition hover:bg-[#f6eadb]"
                >
                  {nom}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-5 shadow-lg">
            <button
              onClick={() => setMembre("")}
              className="mb-4 text-sm text-[#8a6b4f]"
            >
              ← Changer de personne
            </button>

            <h2 className="text-2xl font-bold">{membre}</h2>
            <p className="mt-2 text-[#6f5b48]">
              Entre ton code à 4 chiffres.
              <br />
              Si c’est ta première connexion, ce code sera créé.
            </p>

            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="••••"
              className="mt-5 w-full rounded-2xl border border-[#ead8c3] px-5 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-[#b8875b]"
            />

            <button
              onClick={validerCode}
              className="mt-4 w-full rounded-2xl bg-[#2b2118] px-5 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-[#4a3828]"
            >
              Continuer
            </button>

            {message && (
              <p className="mt-4 rounded-2xl bg-[#fff8ef] p-4 text-center text-sm">
                {message}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}