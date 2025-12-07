import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MovieMatch",
    template: "%s | MovieMatch",
  },
  description:
    "Descubra, organize e compartilhe seus filmes favoritos. Catálogo completo com trailers, sinopses e muito mais.",
  keywords: ["filmes", "movies", "catálogo", "trailers", "cinema", "séries"],
  authors: [{ name: "MovieMatch Team" }],
  openGraph: {
    title: "MovieMatch",
    description: "Descubra filmes perfeitos para você",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
