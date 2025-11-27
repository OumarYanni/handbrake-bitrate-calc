"use client";

import React, { useState } from "react";
import { Settings2, Film, ShieldCheck } from "lucide-react";
import { TimeInput } from "./components/TimeInput";
import { ResultDisplay } from "./components/ResultDisplay";
import { GuideAccordion } from "./components/GuideAccordion";

export default function Home() {
  // --- ETATS TEMPORAIRES POUR LE TEST UI ---
  // On vérifie juste que les inputs répondent bien
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  // Simulation d'un résultat pour tester l'affichage
  const [fakeBitrate, setFakeBitrate] = useState(0);
  const [is4KWarning, setIs4KWarning] = useState(false);

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-lg mx-auto bg-background">
      {/* 1. TEST HEADER */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          Handbrake Bitrate Calc (Mode Test UI)
        </h1>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Settings2 className="w-4 h-4 text-primary" />
        </div>
      </header>

      {/* 2. TEST RESULT DISPLAY */}
      {/* On passe des valeurs manuelles pour voir si le composant est beau */}
      <div className="mb-8 p-4 border border-dashed border-zinc-300 rounded-lg bg-zinc-50">
        <p className="text-xs text-zinc-400 mb-2 uppercase font-bold">
          Zone de contrôle manuel (Dev only)
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setFakeBitrate(5400)}
            className="px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary-hover"
          >
            Simuler Résultat
          </button>
          <button
            onClick={() => setIs4KWarning(!is4KWarning)}
            className="px-3 py-1 bg-warning text-white text-xs rounded"
          >
            Toggle Warning 4K
          </button>
        </div>
      </div>

      <ResultDisplay bitrate={fakeBitrate} isTooLowFor4K={is4KWarning} />

      {/* 3. TEST TIME INPUTS */}
      <div className="space-y-8 mt-8">
        <section>
          <div className="flex items-center gap-2 mb-4 text-zinc-600">
            <Film className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Test Durée
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* Si ces inputs fonctionnent, alors le composant est validé */}
            <TimeInput
              label="Heures"
              value={hours}
              max={99}
              onChange={setHours}
            />
            <TimeInput
              label="Minutes"
              value={minutes}
              max={59}
              onChange={setMinutes}
            />
            <TimeInput
              label="Secondes"
              value={seconds}
              max={59}
              onChange={setSeconds}
            />
          </div>

          <p className="text-xs text-zinc-400 mt-2 text-center">
            Vérification : {hours}h {minutes}m {seconds}s
          </p>
        </section>

        {/* 4. TEST STYLE GLOBAL (Inputs natifs pour comparer) */}
        <section className="bg-white p-5 rounded-2xl border border-border shadow-sm space-y-5 opacity-50 pointer-events-none">
          <h3 className="text-center text-sm text-zinc-400">(test)</h3>
        </section>
      </div>

      {/* 5. TEST ACCORDION */}
      <GuideAccordion />

      <footer className="mt-12 text-center text-xs text-zinc-400">
        <p>Mode Test UI</p>
      </footer>
    </main>
  );
}
