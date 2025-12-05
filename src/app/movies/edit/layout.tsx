import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerenciar Filmes",
  description: "Edite ou remova filmes do catálogo MovieMatch.",
};

export default function EditMoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
