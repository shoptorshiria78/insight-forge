import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import "./globals.css";
import MainLayout from "@/components/shared/MainLayout/MainLayout";
import AuthProvider from './provider/AuthProvider';
import WebTheme from '@/utils/theme/theme';
import ReactQueryProvider from '@/components/React-Query-Provider/ReactOueryProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Insight Forge",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (

    <ReactQueryProvider >
      <html lang="en">
      <body className={inter.className}>
        <WebTheme>
          <AuthProvider>
            <Toaster position="top-center" />
            <MainLayout>{children}</MainLayout>
          </AuthProvider>
        </WebTheme>
      </body>
    </html>
    </ReactQueryProvider>

  );
}