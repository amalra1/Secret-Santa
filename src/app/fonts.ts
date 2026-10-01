import { Anton, Archivo, JetBrains_Mono, New_Rocker } from 'next/font/google';

export const display = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const sans = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-sans',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const gothic = New_Rocker({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gothic',
});

export const fontClassNames = `${display.variable} ${sans.variable} ${mono.variable} ${gothic.variable}`;
