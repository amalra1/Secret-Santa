import { Poppins, Inter } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
