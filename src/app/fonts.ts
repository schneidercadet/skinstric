import localFont from 'next/font/local';

export const roobert = localFont({
  variable: '--font-roobert',
  src: [
    {
      path: '../../public/fonts/Roobert-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roobert-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
}); 