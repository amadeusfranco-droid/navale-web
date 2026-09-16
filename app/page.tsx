"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AgeGate } from '@/components/age-gate';

const products = [
  {
    id: 'esencia',
    title: 'Esencia',
    subtitle: 'Semiseco',
    type: 'Vino',
    price: 65,
    accent: 'black',
    description: 'Elegante y profundo, con notas de frutos negros y un final sofisticado.'
  },
  {
    id: 'santa-cruz',
    title: 'Santa Cruz',
    subtitle: 'Borgoña dulce',
    type: 'Vino',
    price: 72,
    accent: 'red',
    description: 'Aroma intenso, estructura sedosa y una personalidad distintiva.'
  },
  {
    id: 'bertinni',
    title: 'Bertinni',
    subtitle: 'Rosé',
    type: 'Vino',
    price: 68,
    accent: 'rose',
    description: 'Fruta fresca, delicadeza floral y equilibrio ideal para compartir.'
  },
  {
    id: 'blanco-andino',
    title: 'Blanco Andino',
    subtitle: 'Blanco',
    type: 'Vino',
    price: 70,
    accent: 'gold',
    description: 'Fresco, limpio y mineral, con una textura ligera y redonda.'
  },
  {
    id: 'trio-piscos',
    title: 'Trío de Piscos',
    subtitle: 'Colección',
    type: 'Pisco',
    price: 120,
    accent: 'green',
    description: 'Tres perfiles únicos para disfrutar de un ritual clásico y premium.'
  },
  {
    id: 'acholado',
    title: 'Acholado',
    subtitle: 'Puro de uvas seleccionadas',
    type: 'Pisco',
    price: 90,
    accent: 'pine',
    description: 'Más suave, armonioso y delicioso en cada copa.'
  }
];

const rewards = [
  { level: 'Bronze', desc: 'Acumula puntos con cada compra y suma beneficios para tu mesa.' },
  { level: 'Silver', desc: 'Gana mayores recompensas y acceso a lanzamientos exclusivos.' },
  { level: 'Gold', desc: 'Prioridad en eventos, descuentos y experiencias premium.' },
  { level: 'Platinum', desc: 'Recibe regalos especiales, invitaciones y servicio personalizado.' },
  { level: 'Black', desc: 'Acceso VIP a experiencias limitadas y beneficios extraordinarios.' }
];

const ambassadorLevels = [
  { level: 'Start', title: 'Start', description: 'Apertura y comunidad inicial.' },
  { level: 'Gold', title: 'Gold', description: 'Impulso y presencia en eventos.' },
  { level: 'Elite', title: 'Elite', description: 'Manejo regional y activaciones selectivas.' },
  { level: 'Black', title: 'Black', description: 'Liderazgo premium y eventos exclusivos.' }
];

const birthdayTimeline = [
  'D-7: preparación del beneficio',
  'D-5: activación del cupón',
  'D-3: recordatorio por WhatsApp',
  'D-1: confirmación de canje',
  'Día 23: celebración Navalé'
];

const navItems = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#mesa-navale', label: 'Mesa Navalé' },
  { href: '#rewards', label: 'Rewards' },
  { href: '#embajadoras', label: 'Embajadoras' },
  { href: '#contacto', label: 'Contacto' }
];

const formatPrice = (price: number) => `S/ ${price.toFixed(2)}`;

export default function HomePage() {
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    window.localStorage.setItem('navale-cart', JSON.stringify(cart));
  }, [cart]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) return null;
          return { ...product, qty: item.qty };
        })
        .filter(Boolean) as Array<any>,
    [cart]
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (id: string) => {
    setCart((current) => {
      const product = current.find((item) => item.id === id);
      if (product) {
        return current.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const submitWhatsapp = (formData: FormData, type: string) => {
    const values = Object.fromEntries(formData.entries());
    const message = Object.entries(values)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const whatsapp = `https://wa.me/51986332165?text=${encodeURIComponent(
      `Hola Navalé, quiero enviar una solicitud de ${type}:\n\n${message}`
    )}`;
    window.open(whatsapp, '_blank');
  };

  return (
    <main className="page-shell">
      <AgeGate />

      <header className="topbar-wrap">
        <div className="container nav-shell">
          <Link href="/" className="brand-mark" aria-label="Navalé home">
            <span className="brand-n">N</span>
            <div>
              <span className="brand-name">NAVALÉ</span>
              <span className="brand-sub">Vinos &amp; piscos</span>
            </div>
          </Link>

          <nav className="nav-links desktop-only">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions desktop-only">
            <a className="nav-button muted" href="#tienda">
              Tienda
            </a>
            <a className="nav-button" href="https://wa.me/51986332165" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu container">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#tienda" onClick={() => setIsMobileMenuOpen(false)}>
              Tienda
            </a>
          </div>
        )}
      </header>

      <section className="hero-panel">
        <div className="hero-glow" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Bodega Don García</p>
            <h1>
              Vinos y piscos <span>artesanales</span>
            </h1>
            <p className="lead">
              Navalé es una marca de experiencia, tradición y origen. Nuestra colección expresa un estilo premium entre la viticultura, la destilería y la celebración.
            </p>
            <div className="cta-row">
              <a className="button primary" href="#portafolio">
                Descubrir colección
              </a>
              <a className="button ghost" href="#tienda">
                Comprar ahora
              </a>
            </div>
            <ul className="mini-meta">
              <li>Vinos premium</li>
              <li>Piscos artesanales</li>
              <li>Experiencias auténticas</li>
            </ul>
          </div>

          <div className="hero-showcase">
            <div className="bottle bottle-black">
              <div className="bottle-cap" />
              <div className="label-card label-dark">
                <span className="small">NAVALÉ</span>
                <span className="big">ESENCIA</span>
              </div>
            </div>
            <div className="bottle bottle-gold">
              <div className="bottle-cap" />
              <div className="label-card label-gold">
                <span className="small">NAVALÉ</span>
                <span className="big">BLANCO ANDINO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="section section-alt">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">Nosotros</p>
            <h2>Historia de la Bodega Don García</h2>
            <p>
              Navalé nació como una propuesta para recuperar la esencia de la tradición vitivinícola y la destilería artesanal del Perú. Desde la bodega, cada botella reúne historia, alma de la tierra, buen trabajo en los lotes y un sentido profundo de la conversación.
            </p>
            <p>
              Hoy nuestra marca celebra la identidad de la familia, la tierra, las uvas, el tiempo y las mesas donde se comparte un buen trago con intención.
            </p>
          </div>
          <div className="story-card">
            <div className="story-badge">Desde 2025</div>
            <h3>Tradición, carácter y distinción</h3>
            <p>Navalé fusiona vinos y piscos artesanales con una visión premium, honesta y contemporánea.</p>
          </div>
        </div>
      </section>

      <section id="portafolio" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Portafolio</p>
            <h2>Esencia, Santa Cruz, Bertinni, Blanco Andino y más</h2>
          </div>
          <div className="catalog-grid">
            {products.map((product) => (
              <article key={product.id} className={`wine-card accent-${product.accent}`}>
                <div className="mini-bottle">
                  <div className="mini-cap" />
                  <div className="mini-label">
                    <span>{product.title}</span>
                  </div>
                </div>
                <div className="wine-meta">
                  <p className="wine-type">{product.type}</p>
                  <h3>{product.title}</h3>
                  <p className="wine-subtitle">{product.subtitle}</p>
                  <p className="wine-description">{product.description}</p>
                  <div className="price-row">
                    <span>{formatPrice(product.price)}</span>
                    <button onClick={() => addToCart(product.id)}>Agregar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mesa-navale" className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Mesa Navalé</p>
            <h2>Experiencia gastronómica premium</h2>
          </div>
          <div className="feature-grid three-up">
            <div className="feature-box">
              <span>01</span>
              <h3>Maridajes</h3>
              <p>Vinos y piscos pensados para acompañar la mesa con textura, equilibrio y distinción.</p>
            </div>
            <div className="feature-box">
              <span>02</span>
              <h3>Eventos</h3>
              <p>Experiencias íntimas, celebraciones y catas premium con un sentido de marca muy claro.</p>
            </div>
            <div className="feature-box">
              <span>03</span>
              <h3>Servicio</h3>
              <p>Atención amable, recomendaciones de asesoría y una experiencia de consumo memorables.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="rewards" className="section">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">Club Navalé Rewards</p>
            <h2>Más que puntos: una experiencia premium</h2>
          </div>
          <div className="rewards-grid">
            {rewards.map((reward) => (
              <div key={reward.level} className="reward-card">
                <div className="capsule">{reward.level}</div>
                <p>{reward.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">Mes Navalé de Cumpleaños</p>
            <h2>Beneficio desde D-7 hasta el día 23</h2>
          </div>
          <div className="timeline">
            {birthdayTimeline.map((item, index) => (
              <div key={item} className="timeline-item">
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="embajadoras" className="section">
        <div className="container embed-grid">
          <div>
            <p className="eyebrow">Programa de Embajadoras</p>
            <h2>Start, Gold, Elite y Black</h2>
            <p>Forma parte de una comunidad que comparte el valor de Navalé y convierte cada botella en un motivo para celebrar.</p>
          </div>

          <div className="level-list">
            {ambassadorLevels.map((level) => (
              <div key={level.level} className="level-row">
                <span className="level-badge">{level.level}</span>
                <div>
                  <strong>{level.title}</strong>
                  <p>{level.description}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="form-card"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget as HTMLFormElement);
              submitWhatsapp(formData, 'postulación de embajadora');
            }}
          >
            <h3>Postúlate como embajadora</h3>
            <input name="nombre" placeholder="Nombre" required />
            <input name="ciudad" placeholder="Ciudad" required />
            <input name="email" type="email" placeholder="Correo" required />
            <textarea name="mensaje" placeholder="Cuéntanos sobre tu perfil" rows={4} />
            <button type="submit">Enviar solicitud</button>
          </form>
        </div>
      </section>

      <section id="contacto" className="section section-alt">
        <div className="container contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Proveedores</p>
            <h3>Propón una alianza</h3>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget as HTMLFormElement);
                submitWhatsapp(formData, 'propuesta de proveedor');
              }}
            >
              <input name="empresa" placeholder="Empresa" required />
              <input name="contacto" placeholder="Contacto" required />
              <input name="email" type="email" placeholder="Correo" required />
              <textarea name="propuesta" placeholder="Describe tu propuesta" rows={4} />
              <button type="submit">Enviar propuesta</button>
            </form>
          </div>

          <div className="contact-card">
            <p className="eyebrow">Trabaja con nosotros</p>
            <h3>Únete al equipo Navalé</h3>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget as HTMLFormElement);
                submitWhatsapp(formData, 'postulación al equipo');
              }}
            >
              <input name="nombre" placeholder="Nombre completo" required />
              <input name="puesto" placeholder="Puesto de interés" required />
              <input name="telefono" placeholder="Teléfono" required />
              <textarea name="cv" placeholder="Cuéntanos sobre ti" rows={4} />
              <button type="submit">Postular</button>
            </form>
          </div>
        </div>
      </section>

      <section id="tienda" className="section">
        <div className="container storefront">
          <div className="store-header">
            <div>
              <p className="eyebrow">Tienda</p>
              <h2>Compra Navalé</h2>
            </div>
            <Link href="/checkout" className="button primary">
              Ir al checkout
            </Link>
          </div>

          <div className="store-grid">
            <div className="catalog-list">
              {products.map((product) => (
                <div key={product.id} className="mini-product">
                  <div className="mini-product-name">
                    <span>{product.title}</span>
                    <small>{product.subtitle}</small>
                  </div>
                  <div className="mini-product-price">{formatPrice(product.price)}</div>
                  <button onClick={() => addToCart(product.id)}>Agregar</button>
                </div>
              ))}
            </div>

            <aside className="cart-panel">
              <h3>Carrito</h3>
              {cartItems.length === 0 ? (
                <p className="empty-cart">Aún no has agregado productos.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <strong>{item.title}</strong>
                        <small>
                          {item.qty} x {formatPrice(item.price)}
                        </small>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>Quitar</button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <Link href="/checkout" className="button primary wide">
                    Finalizar compra
                  </Link>
                </>
              )}
            </aside>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand-mark footer-brand">
              <span className="brand-n">N</span>
              <div>
                <span className="brand-name">NAVALÉ</span>
                <span className="brand-sub">Vinos &amp; piscos</span>
              </div>
            </div>
          </div>

          <div>
            <h4>Contacto</h4>
            <ul>
              <li>WhatsApp: +51 986 332 165</li>
              <li>Comercial: Comercial@navaleperu.com</li>
              <li>Gerencia: Gerencia@navaleperu.com</li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/legal">Política de privacidad</Link>
              </li>
              <li>
                <Link href="/legal">Términos y condiciones</Link>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/KSOIMXYtdmB5Fr4KIZLsLw" target="_blank" rel="noreferrer">
                  Grupo de embajadoras
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
