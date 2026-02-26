import type { Metadata } from "next";
import { Playfair_Display, DM_Mono, DM_Sans } from "next/font/google";
import { Providers } from "@/lib/providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coimbra Lens — A cidade em dados",
  description:
    "Painel de dados imersivo sobre Coimbra. Clima, mobilidade, universidade e mercado imobiliário em tempo real.",
  keywords: ["Coimbra", "dados", "dashboard", "Portugal", "tempo real"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmMono.variable} ${dmSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
