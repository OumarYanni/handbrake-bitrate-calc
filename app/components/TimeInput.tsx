"use client";

import React from "react";

interface TimeInputProps {
  label: string;
  value: number;
  max: number;
  onChange: (val: number) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value,
  max,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Si l'input est vide, on considère que c'est 0 pour le calcul
    if (e.target.value === "") {
      onChange(0);
      return;
    }

    let val = parseInt(e.target.value, 10);

    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;

    // si la valeur dépasse le max, on force le max
    if (val > max) val = max;

    onChange(val);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
        {label}
      </label>
      <input
        type="number"
        min="0"
        max={max}
        // Si la valeur est 0, on laisse le champ vide pour faciliter la frappe,
        // le placeholder '0' s'affichera
        value={value === 0 ? "" : value}
        placeholder="0"
        onChange={handleChange}
        onWheel={(e) => e.currentTarget.blur()} // Empêche le scroll accidentel changeant les valeurs
        className="w-full bg-surface border border-border rounded-lg p-3 text-center text-xl font-bold text-zinc-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-zinc-300 shadow-sm"
      />
    </div>
  );
};
