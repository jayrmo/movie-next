import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;

  // Formata o nome da categoria para exibição
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Filmes de ${categoryName}`,
    description: `Explore todos os filmes da categoria ${categoryName} no MovieMatch.`,
    openGraph: {
      title: `Filmes de ${categoryName} | MovieMatch`,
      description: `Descubra os melhores filmes de ${categoryName}`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
