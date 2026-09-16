"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const legalSections = [
  {
    title: '1. Información general',
    body:
      'Navalé es una marca de vinos y piscos artesanales, representada por la Bodega Don García. La información publicada en este sitio busca informar sobre nuestra colección, experiencias, recompensas, proveedores y oportunidades de trabajo.'
  },
  {
    title: '2. Política de privacidad',
    body:
      'Recopilamos datos únicamente cuando voluntariamente nos los compartes a través de formularios, WhatsApp o correos corporativos. Los datos serán usados para responder solicitudes, administrar alianzas, y coordinar procesos de contacto.'
  },
  {
    title: '3. Términos y condiciones',
    body:
      'Al interactuar con la web, aceptas que la información publicada es orientativa y puede variar según disponibilidad, cambios de inventario o promociones. Navalé se reserva el derecho de modificar contenidos sin previo aviso.'
  },
  {
    title: '4. Cookies',
    body:
      'Utilizamos tecnologías de sesión para mantener una mejor experiencia de navegación y recordar elementos como el carrito de compras. Puedes desactivar cookies siguiendo la configuración de tu navegador.'
  },
  {
    title: '5. Venta responsable',
    body:
      'La compra y consumo de bebidas alcohólicas debe realizarse de manera responsable. Es obligatorio verificar la edad al momento de comprar o consumir. Navalé no vende a menores de edad.'
  },
  {
    title: '6. Contacto',
    body:
      'Para consultas, dudas, proveedores o postulaciones puedes escribirnos a Comercial@navaleperu.com o Gerencia@navaleperu.com, o contactarnos por WhatsApp al +51 986 332 165.'
  }
];

export default function LegalPage() {
  const [isAdult, setIsAdult] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('navale-age-verified');
    if (stored === 'true') setIsAdult(true);
  }, []);

  const handleVerify = () => {
    window.localStorage.setItem('navale-age-verified', 'true');
    setIsAdult(true);
  };

  return (
    <main className="legal-page">
      <div className="container legal-shell">
        <Link href="/" className="back-link">
          ← Volver a Navalé
        </Link>

        <div className="legal-header">
          <p className="eyebrow">Legal</p>
          <h1>Política y condiciones</h1>
        </div>

        {!isAdult && (
          <div className="age-modal legal-age">
            <h3>Verificación de edad</h3>
            <p>Debes ser mayor de 18 años para acceder a la información de bebidas alcohólicas.</p>
            <button onClick={handleVerify}>Confirmo que soy mayor de edad</button>
          </div>
        )}

        <div className="legal-grid">
          {legalSections.map((section) => (
            <section key={section.title} className="legal-card">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
