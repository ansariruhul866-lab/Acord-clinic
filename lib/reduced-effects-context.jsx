"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ReducedEffectsContext = createContext({
  reducedEffects: false,
  toggleReducedEffects: () => {},
});

export const ReducedEffectsProvider = ({ children }) => {
  const [reducedEffects, setReducedEffects] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("acord_reduced_effects");
    if (saved !== null) {
      setReducedEffects(saved === "true");
    } else {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedEffects(mediaQuery.matches);
    }
  }, []);

  const toggleReducedEffects = () => {
    const next = !reducedEffects;
    setReducedEffects(next);
    localStorage.setItem("acord_reduced_effects", String(next));
  };

  return (
    <ReducedEffectsContext.Provider value={{ reducedEffects, toggleReducedEffects }}>
      {children}
    </ReducedEffectsContext.Provider>
  );
};

export const useReducedEffects = () => useContext(ReducedEffectsContext);
