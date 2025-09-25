import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/themeRegistry/ThemeRegistry';
import { GroupProvider } from '@/contexts/GroupContext';
import { poppins } from './fonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secret Santa',
  description: 'Made by Pedro Amaral Chapelin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable}`}>
        <ThemeRegistry>
          <GroupProvider>{children}</GroupProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
