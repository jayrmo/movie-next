"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { MovieModal } from "@/components/MovieModal";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";

interface Movie {
  _id: string;
  title: string;
  releaseDate: string;
  genre: string;
  director: string;
  synopsis: string;
  trailerUrl?: string;
  featured: boolean;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies");
        const data: Movie[] = await res.json();
        setMovies(data);

        // Encontrar o label da categoria a partir dos filmes
        for (const movie of data) {
          const genres = movie.genre.split(/,\s*|;\s*|\s+e\s+/);
          for (const g of genres) {
            if (normalizeText(g.trim()) === category) {
              setCategoryLabel(g.trim());
              break;
            }
          }
          if (categoryLabel) break;
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [category, categoryLabel]);

  const filteredMovies = movies.filter((movie) => {
    const genres = movie.genre.split(/,\s*|;\s*|\s+e\s+/);
    return genres.some((g) => normalizeText(g.trim()) === category);
  });

  const handleOpenDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-white text-xl">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button
              isIconOnly
              variant="light"
              onPress={() => router.push("/home")}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Filmes de {categoryLabel || category}
              </h1>
              <p className="text-zinc-400 mt-1">
                {filteredMovies.length}{" "}
                {filteredMovies.length === 1
                  ? "filme encontrado"
                  : "filmes encontrados"}
              </p>
            </div>
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum filme encontrado
            </h3>
            <p className="text-zinc-400">
              Não há filmes cadastrados nesta categoria ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                id={movie._id}
                title={movie.title}
                releaseDate={movie.releaseDate}
                genre={movie.genre}
                trailerUrl={movie.trailerUrl}
                featured={movie.featured}
                onOpenDetails={() => handleOpenDetails(movie)}
              />
            ))}
          </div>
        )}
      </main>

      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={
          selectedMovie
            ? {
                title: selectedMovie.title,
                releaseDate: selectedMovie.releaseDate,
                genre: selectedMovie.genre,
                director: selectedMovie.director,
                synopsis: selectedMovie.synopsis,
                trailerUrl: selectedMovie.trailerUrl,
              }
            : null
        }
      />
    </div>
  );
}
