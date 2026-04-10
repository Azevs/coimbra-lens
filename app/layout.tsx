import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import { Providers } from "@/lib/providers";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
        className={`${fraunces.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
