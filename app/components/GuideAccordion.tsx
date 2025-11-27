"use client";

import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

export const GuideAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12 border border-border rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-zinc-50 transition-colors"
      >
        <div className="flex items-center gap-2 text-zinc-700 font-semibold">
          <Info className="w-5 h-5 text-primary" />
          <span>Guide Rapide</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 text-sm text-zinc-600 bg-zinc-50/50">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs">
              1
            </span>
            <div>
              <strong className="text-zinc-900 block">Filmer</strong>
              Privilégier UHD (4K) ou FHD 30fps pour la source.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs">
              2
            </span>
            <div>
              <strong className="text-zinc-900 block">Calculer</strong>
              Entrer la durée exacte de votre montage final ici.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <div>
              <strong className="text-zinc-900 block">Encoder</strong>
              Ouvrir Handbrake {">"} Onglet Vidéo.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs">
              4
            </span>
            <div>
              <strong className="text-zinc-900 block">Régler</strong>
              Choisir Codec H.265 {">"} Cocher 'Avg Bitrate' {">"} Entrer le
              chiffre calculé {">"} Cocher '2-pass'.
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold text-xs">
              5
            </span>
            <div>
              <strong className="text-zinc-900 block">Export</strong>
              Le fichier fera exactement la taille prévue (moins la marge de
              sécurité).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
