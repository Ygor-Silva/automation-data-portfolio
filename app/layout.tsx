import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Ygor Teixeira | Desenvolvedor de Sistemas · ERP, Full-Stack e IA',
  description: 'Portfólio de Ygor Teixeira: ERP Senior Sapiens, sistemas full-stack (Next.js, PostgreSQL/Supabase, Python) integrados ao ERP e IA aplicada com Claude.',
  metadataBase: new URL('https://ygor-teixeira-portfolio.vercel.app'),
  openGraph: {
    title: 'Ygor Teixeira | Desenvolvedor de Sistemas · ERP, Full-Stack e IA',
    description: 'Sistemas que conectam ERP, dados e IA: SaaS multi-tenant, portais corporativos e integrações com o ERP Senior.',
    url: '/',
    siteName: 'Ygor Teixeira',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Ygor Teixeira — ERP, Full-Stack e IA' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
