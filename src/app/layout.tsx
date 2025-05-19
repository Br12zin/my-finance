import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formulário de Finança",
  description: "Gerando um formulário de Cadastro Bancário ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
