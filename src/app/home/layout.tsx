import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Explore filmes em destaque, descubra novos títulos e gerencie seu catálogo no MovieMatch.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
