"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Settings2, Film, ShieldCheck } from "lucide-react";

// Imports internes
import { CalculatorState, DEFAULT_STATE } from "./types";
import { TimeInput } from "./components/TimeInput";
import { ResultDisplay } from "./components/ResultDisplay";
import { GuideAccordion } from "./components/GuideAccordion";

const STORAGE_KEY = "hb-bitrate-calc-v1";

export default function Home() {
  // 1. Initialisation avec l'état par défaut (pour éviter erreur SSR)
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. Chargement depuis le LocalStorage (uniquement côté client au montage)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    setIsLoaded(true);
  }, []);

  // 3. Sauvegarde automatique à chaque changement
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateState = <K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  // 4. Logique de Calcul (Mémorisé pour la performance)
  const bitrateResult = useMemo(() => {
    const totalSeconds =
      state.hours * 3600 + state.minutes * 60 + state.seconds;

    if (totalSeconds <= 0) return 0;

    let targetMB = state.targetSize;
    if (state.targetUnit === "GB") {
      targetMB = targetMB * 1024;
    }

    // Marge de sécurité (30MB)
    const safetyMargin = state.useSafetyMargin ? 30 : 0;
    const availableMB = targetMB - safetyMargin;

    if (availableMB <= 0) return 0;

    // Audio Overhead
    // Formule: (AudioBitrate_kbps * Duration_sec) / 8192 = Size_MB
    const audioSizeMB = (state.audioBitrate * totalSeconds) / 8192;

    const videoAvailableMB = availableMB - audioSizeMB;

    if (videoAvailableMB <= 0) return 0;

    // Video Bitrate
    // Formule: (Available_MB * 8192) / Duration_sec = Kbps
    const videoBitrate = (videoAvailableMB * 8192) / totalSeconds;

    return Math.max(0, Math.floor(videoBitrate));
  }, [state]);

  const isLowQualityWarning =
    state.videoFormat === "4K" && bitrateResult > 0 && bitrateResult < 2500;

  // Petit loading state pour éviter un saut d'affichage brutal
  if (!isLoaded) return null;

  return (
    <main className="min-h-screen p-6 md:p-12 max-w-lg mx-auto">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          Handbrake Bitrate Calc
        </h1>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Settings2 className="w-4 h-4 text-primary" />
        </div>
      </header>

      {/* Main Result */}
      <ResultDisplay
        bitrate={bitrateResult}
        isTooLowFor4K={isLowQualityWarning}
      />

      {/* Form Grid */}
      <div className="space-y-8">
        {/* Section: Duration */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-zinc-600">
            <Film className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Durée du Rush
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <TimeInput
              label="Heures"
              value={state.hours}
              max={99}
              onChange={(v) => updateState("hours", v)}
            />
            <TimeInput
              label="Minutes"
              value={state.minutes}
              max={59}
              onChange={(v) => updateState("minutes", v)}
            />
            <TimeInput
              label="Secondes"
              value={state.seconds}
              max={59}
              onChange={(v) => updateState("seconds", v)}
            />
          </div>
        </section>

        {/* Section: Constraints */}
        <section className="bg-white p-5 rounded-2xl border border-border shadow-sm space-y-5">
          {/* Target Size */}
          <div>
            <label className="block text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">
              Taille Limite
            </label>
            <div className="flex shadow-sm rounded-lg">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={state.targetSize === 0 ? "" : state.targetSize}
                placeholder="0"
                onChange={(e) =>
                  updateState("targetSize", parseFloat(e.target.value) || 0)
                }
                className="flex-1 bg-surface border border-border border-r-0 rounded-l-lg p-3 text-lg font-bold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-zinc-300"
              />
              <select
                value={state.targetUnit}
                onChange={(e) =>
                  updateState("targetUnit", e.target.value as "MB" | "GB")
                }
                className="bg-zinc-50 border border-border border-l-0 rounded-r-lg px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer focus:outline-none focus:border-primary"
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Audio Bitrate */}
            <div>
              <label className="block text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">
                Audio Bitrate
              </label>
              <select
                value={state.audioBitrate}
                onChange={(e) =>
                  updateState(
                    "audioBitrate",
                    parseInt(e.target.value, 10) as any
                  )
                }
                className="w-full bg-surface border border-border rounded-lg p-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-primary transition-colors cursor-pointer shadow-sm"
              >
                <option value="128">128 kbps</option>
                <option value="160">160 kbps (Std)</option>
                <option value="192">192 kbps</option>
                <option value="320">320 kbps (Max)</option>
              </select>
            </div>

            {/* Format Context */}
            <div>
              <label className="block text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">
                Format Rush
              </label>
              <select
                value={state.videoFormat}
                onChange={(e) =>
                  updateState("videoFormat", e.target.value as "FHD" | "4K")
                }
                className="w-full bg-surface border border-border rounded-lg p-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-primary transition-colors cursor-pointer shadow-sm"
              >
                <option value="FHD">FHD (1080p)</option>
                <option value="4K">UHD (4K)</option>
              </select>
            </div>
          </div>

          {/* Safety Margin Toggle */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck
                className={`w-4 h-4 ${
                  state.useSafetyMargin ? "text-green-600" : "text-zinc-400"
                }`}
              />
              <label
                htmlFor="safety-margin"
                className="text-sm font-medium text-zinc-700 cursor-pointer select-none"
              >
                Marge de sécurité (-30MB)
              </label>
            </div>
            <button
              id="safety-margin"
              onClick={() =>
                updateState("useSafetyMargin", !state.useSafetyMargin)
              }
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                state.useSafetyMargin ? "bg-primary" : "bg-zinc-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform transform shadow-sm ${
                  state.useSafetyMargin ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </section>
      </div>

      <GuideAccordion />

      <footer className="mt-12 text-center text-xs text-zinc-400">
        <p>Calculs basés sur l'algorithme standard Handbrake.</p>
        <p>Optimisé pour l'upload Canva.</p>
      </footer>
    </main>
  );
}
