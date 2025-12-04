"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { MovieModal } from "@/components/MovieModal";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";

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

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query) ||
      movie.synopsis.toLowerCase().includes(query)
    );
  });

  const handleOpenDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
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
          <h1 className="text-4xl font-bold text-white mb-4">
            Todos os Filmes
          </h1>
          <Input
            placeholder="Buscar por título, gênero, diretor ou sinopse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="text-zinc-400" size={20} />}
            classNames={{
              base: "max-w-2xl",
              input: "text-white",
              inputWrapper:
                "bg-zinc-800 border-zinc-700 data-[hover=true]:bg-zinc-700 group-data-[focus=true]:bg-zinc-700",
            }}
            size="lg"
          />
          {searchQuery && (
            <p className="text-zinc-400 mt-2">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1
                ? "filme encontrado"
                : "filmes encontrados"}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-400 text-lg">
                Nenhum filme encontrado com &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </main>

      <MovieModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
