"use client";

import { useState } from "react";

const membres = ["Florence", "Alexandre", "Nicolas", "Caroline", "Seyun"];
const nomsJours = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const aujourdHui = new Date();

const jours = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(aujourdHui);
  date.setDate(aujourdHui.getDate() + i);

  return {
    nom: nomsJours[date.getDay()],
    date: date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    }),
    id: date.toISOString().split("T")[0],
  };
});
const repas = ["Midi", "Soir"];

export default function Home() {
  const [membre, setMembre] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [utilisateurConnecte, setUtilisateurConnecte] = useState("");
  const [repasOuvert, setRepasOuvert] = useState("");
  const [menus, setMenus] = useState<Record<string, string>>({});
  const [presences, setPresences] = useState<Record<string, Record<string, string>>>({});

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
      setUtilisateurConnecte(membre);
      return;
    }

    if (code === codeEnregistre) {
      localStorage.setItem("membre-connecte", membre);
      setUtilisateurConnecte(membre);
    } else {
      setMessage("Code incorrect.");
    }
  }

  function definirPresence(repasId: string, statut: "mange" | "ne mange pas") {
    setPresences((ancien) => ({
      ...ancien,
      [repasId]: {
        ...ancien[repasId],
        [utilisateurConnecte]: statut,
      },
    }));
  }

  function modifierMenu(repasId: string, texte: string) {
    setMenus((ancien) => ({
      ...ancien,
      [repasId]: texte,
    }));
  }

  if (utilisateurConnecte) {
    return (
      <main className="min-h-screen bg-[#fff8ef] px-4 py-8 text-[#2b2118]">
        <section className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-lg">
            <div className="mb-3 text-5xl">🍽️</div>
            <h1 className="text-3xl font-bold">
              Bienvenue {utilisateurConnecte} 
            </h1>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            {jours.map((jour) => (
              <div key={jour.id} className="rounded-3xl bg-white p-4 shadow-md">
<h2 className="text-center text-lg font-bold">
  {jour.nom}
</h2>

<p className="mb-4 text-center text-sm text-[#6f5b48]">
  {jour.date}
</p>
                <div className="space-y-3">
                  {repas.map((moment) => {
                    const repasId = `${jour.id}-${moment}`;
                    const estOuvert = repasOuvert === repasId;

                    const mange = membres.filter(
                      (nom) => presences[repasId]?.[nom] === "mange"
                    );

                    const neMangePas = membres.filter(
                      (nom) => presences[repasId]?.[nom] === "ne mange pas"
                    );

                    return (
                      <div key={repasId}>
                        <button
                          onClick={() => setRepasOuvert(estOuvert ? "" : repasId)}
                          className="w-full rounded-2xl bg-[#fff8ef] px-4 py-3 text-left font-semibold shadow-sm"
                        >
                          {moment}
                          {menus[repasId] && (
                            <span className="mt-1 block text-sm font-normal text-[#6f5b48]">
                              {menus[repasId]}
                            </span>
                          )}
                        </button>

                        {estOuvert && (
                          <div className="mt-3 rounded-2xl border border-[#ead8c3] bg-[#fffaf3] p-4">
                            <input
                              value={menus[repasId] || ""}
                              onChange={(e) => modifierMenu(repasId, e.target.value)}
                              placeholder="Écrire le menu..."
                              className="mb-4 w-full rounded-xl border border-[#ead8c3] px-3 py-2 text-sm outline-none"
                            />

                            <div className="mb-3 grid grid-cols-2 gap-2">
                              <button
                                onClick={() => definirPresence(repasId, "mange")}
                                className="rounded-xl bg-green-100 px-3 py-2 text-sm font-semibold"
                              >
                                M
                              </button>

                              <button
                                onClick={() => definirPresence(repasId, "ne mange pas")}
                                className="rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold"
                              >
                                MP
                              </button>
                            </div>

                            <div className="grid gap-3 text-sm">
                              <div>
                                <p className="font-bold">Mange</p>
                                <p className="text-[#6f5b48]">
                                  {mange.length ? mange.join(", ") : "Personne"}
                                </p>
                              </div>

                              <div>
                                <p className="font-bold">Ne mange pas</p>
                                <p className="text-[#6f5b48]">
                                  {neMangePas.length ? neMangePas.join(", ") : "Personne"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setUtilisateurConnecte("");
              setMembre("");
              setCode("");
              setMessage("");
            }}
            className="mt-6 w-full rounded-2xl border border-[#ead8c3] bg-white px-5 py-4 font-medium shadow"
          >
            Se déconnecter
          </button>
        </section>
      </main>
    );
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