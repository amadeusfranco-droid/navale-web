import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://navaleperu.com'),
  title: 'Navalé | Vinos y piscos artesanales',
  description:
    'Navalé ofrece vinos y piscos artesanales de la Bodega Don García. Descubre nuestra colección, rewards, embajadoras, proveedores y tienda.',
  keywords: ['Navalé', 'vinos', 'piscos artesanales', 'Bodega Don García', 'Perú'],
  openGraph: {
    title: 'Navalé | Vinos y piscos artesanales',
    description:
      'Bodega Don García y colección premium de vinos y piscos artesanales.',
    type: 'website',
    url: 'https://navaleperu.com'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Navalé | Vinos y piscos artesanales',
    description: 'Premium wine and pisco experiences from Bodega Don García.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
