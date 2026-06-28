import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "FinSight",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/FinSightwhite.png" sizes="any" />
        </head>
        <body className={`${inter.variable} font-sans antialiased`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-gray-50 border-t py-8">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              <p>Made by Ajay Mourya</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
