"use client";

import { useEffect, useState } from 'react';

export function AgeGate() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem('navale-age-verified');
    if (stored === 'true') {
      setIsOpen(false);
    }
  }, []);

  const confirmAge = () => {
    window.localStorage.setItem('navale-age-verified', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="age-gate-overlay">
      <div className="age-gate">
        <p className="eyebrow">Verificación de edad</p>
        <h2>Para continuar, confirma que eres mayor de edad.</h2>
        <p>Contenido exclusivo para adultos mayores de 18 años.</p>
        <button onClick={confirmAge}>Confirmo que soy mayor de 18</button>
      </div>
    </div>
  );
}
