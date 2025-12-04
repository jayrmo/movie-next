"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { MovieModal } from "@/components/MovieModal";
import { Button } from "@/components/Button";
import { Pagination } from "@heroui/react";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const featuredMovies = movies.filter((m) => m.featured);
  const currentFeatured = featuredMovies[currentFeaturedIndex];
  const embedUrl = currentFeatured?.trailerUrl
    ? getYouTubeEmbedUrl(currentFeatured.trailerUrl)
    : null;

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex(
      (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  const handleOpenDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailsOpen(true);
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
        {/* Hero Section */}
        <section className="mb-8 sm:mb-12 text-center py-8 sm:py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent px-4">
            Bem-vindo ao MovieMatch
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 mb-6 sm:mb-8 px-4">
            Descubra, organize e compartilhe seus filmes favoritos
          </p>
        </section>

        {/* Featured Movie Banner */}
        {currentFeatured && (
          <section className="mb-12">
            <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              {embedUrl ? (
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "42%" }}
                >
                  <iframe
                    src={embedUrl}
                    title={currentFeatured.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  {}
                  {featuredMovies.length > 1 && (
                    <>
                      <button
                        onClick={prevFeatured}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all z-10"
                      >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextFeatured}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all z-10"
                      >
                        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}
                </div>
              ) : null}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                    DESTAQUE
                  </span>
                  <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm">
                    {new Date(currentFeatured.releaseDate).getFullYear()}
                  </span>
                  <span className="bg-zinc-800 text-purple-400 px-3 py-1 rounded-full text-sm">
                    {currentFeatured.genre}
                  </span>
                  {featuredMovies.length > 1 && (
                    <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm ml-auto">
                      {currentFeaturedIndex + 1} / {featuredMovies.length}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {currentFeatured.title}
                </h2>
                <p className="text-zinc-300 text-base md:text-lg mb-4 max-w-4xl line-clamp-3 md:line-clamp-none">
                  {currentFeatured.synopsis}
                </p>
                <div className="flex gap-3">
                  <Button
                    color="primary"
                    size="lg"
                    onPress={() => handleOpenDetails(currentFeatured)}
                    startContent={<Play size={20} />}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>

              {/* Carousel Controls - outside video container (when no video) */}
              {featuredMovies.length > 1 && !embedUrl && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all z-10"
                  >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all z-10"
                  >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {featuredMovies.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {featuredMovies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturedIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentFeaturedIndex
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Filmes em Destaque */}
        {featuredMovies.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">
                Filmes em Destaque
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {featuredMovies.map((movie) => (
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
          </section>
        )}

        {/* Todos os Filmes */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Todos os Filmes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {paginatedMovies.map((movie) => (
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

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
                classNames={{
                  wrapper: "gap-2",
                  item: "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800",
                  cursor: "bg-primary text-white",
                  prev: "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800",
                  next: "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800",
                }}
              />
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      <MovieModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
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
