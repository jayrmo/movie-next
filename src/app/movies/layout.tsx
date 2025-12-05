import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Filmes",
  description:
    "Navegue pelo catálogo completo de filmes do MovieMatch. Encontre seus favoritos e descubra novos títulos.",
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
