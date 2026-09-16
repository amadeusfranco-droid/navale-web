"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem('navale-cart');
    if (raw) {
      try {
        setCart(JSON.parse(raw));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const products = [
    { id: 'esencia', title: 'Esencia', price: 65 },
    { id: 'santa-cruz', title: 'Santa Cruz', price: 72 },
    { id: 'bertinni', title: 'Bertinni', price: 68 },
    { id: 'blanco-andino', title: 'Blanco Andino', price: 70 },
    { id: 'trio-piscos', title: 'Trío de Piscos', price: 120 },
    { id: 'acholado', title: 'Acholado', price: 90 }
  ];

  const items = cart
    .map((line) => {
      const product = products.find((item) => item.id === line.id);
      if (!product) return null;
      return { ...product, qty: line.qty };
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const submitOrder = () => {
    const text = items
      .map((item) => `${item.title} x${item.qty} - S/ ${(item.price * item.qty).toFixed(2)}`)
      .join('\n');

    const url = `https://wa.me/51986332165?text=${encodeURIComponent(
      `Hola Navalé, quiero realizar mi pedido:\n\n${text}\n\nSubtotal: S/ ${subtotal.toFixed(2)}`
    )}`;
    window.open(url, '_blank');
  };

  return (
    <main className="checkout-page">
      <div className="container checkout-shell">
        <div className="checkout-header">
          <Link href="/" className="back-link">← Seguir comprando</Link>
          <h1>Checkout Navalé</h1>
        </div>

        <div className="checkout-grid">
          <section className="checkout-form-card">
            <h2>Datos del pedido</h2>
            <input placeholder="Nombre completo" />
            <input placeholder="Correo electrónico" type="email" />
            <input placeholder="Teléfono" />
            <input placeholder="Dirección de entrega" />
            <textarea rows={4} placeholder="Notas adicionales" />
          </section>

          <aside className="checkout-summary">
            <h2>Resumen</h2>
            {items.length === 0 ? (
              <p className="empty-cart">Tu carrito está vacío.</p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id} className="summary-row">
                    <span>
                      {item.title} x{item.qty}
                    </span>
                    <strong>S/ {(item.price * item.qty).toFixed(2)}</strong>
                  </div>
                ))}
                <div className="total-row">
                  <span>Total</span>
                  <strong>S/ {subtotal.toFixed(2)}</strong>
                </div>
                <button className="button primary wide" onClick={submitOrder}>Confirmar por WhatsApp</button>
              </>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
