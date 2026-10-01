import type { Metadata, Viewport } from 'next';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Preloader from '@/components/layout/Preloader/Preloader';
import RouteCurtain from '@/components/layout/RouteCurtain/RouteCurtain';
import SkipLink from '@/components/layout/SkipLink/SkipLink';
import Providers from '@/components/providers/Providers/Providers';
import { MAIN_CONTENT_ID } from '@/constants/routes';
import { SITE_NAME, SITE_URL } from '@/constants/site';
import { INTRO_SCRIPT } from '@/lib/introScript';
import type { RootLayoutProps } from '@/types/components/layout';
import { fontClassNames } from './fonts';
import '@/styles/tokens.css';
import '@/styles/reset.css';
import '@/styles/focus.css';
import '@/styles/utilities.css';
import '@/styles/motion.css';

const TITLE = 'Amigo Secreto · Sorteie os nomes e guarde o segredo';
const DESCRIPTION =
  'Organize um amigo secreto em um minuto. Sorteie os nomes, passe o celular ou mande links secretos. Sem cadastro, sem servidor. Por Pedro Chapelin.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Pedro Amaral Chapelin', url: 'https://chapelin.com.br' }],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'pt_BR',
    alternateLocale: 'en_US',
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: '#0f0b0b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR" className={fontClassNames} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <Providers>
          <SkipLink />
          <Preloader />
          <Header />
          <main id={MAIN_CONTENT_ID} className="main">
            {children}
          </main>
          <Footer />
          <RouteCurtain />
        </Providers>
      </body>
    </html>
  );
}
