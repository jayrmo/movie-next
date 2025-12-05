import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adicionar Filme",
  description: "Adicione um novo filme ao catálogo do MovieMatch.",
};

export default function CreateMovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
