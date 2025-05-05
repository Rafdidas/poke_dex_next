import type { Metadata } from "next";
import "./globals.scss";
import Providers from "./provider";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Next PokeDex",
  description: "Next PokeDex next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fastly.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css"
          rel="stylesheet"
        />
      </head>
      <body >
        <Providers>
          <Header />
          <div className="cntbody">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
