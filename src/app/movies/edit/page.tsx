"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/Button";
import { MovieFormModal, MovieFormData } from "@/components/MovieFormModal";
import {
  Input,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
} from "@heroui/react";
import { Search, Edit2, Trash2, ArrowLeft } from "lucide-react";

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

export default function EditMoviesPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchMovies();
  }, []);

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

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSubmit = async (movieData: MovieFormData) => {
    if (!selectedMovie) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/movies/${selectedMovie._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (res.ok) {
        await fetchMovies();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectMovie = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredMovies.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredMovies.map((m) => m._id)));
    }
  };

  const handleDeleteSelected = async () => {
    setIsSubmitting(true);
    try {
      await Promise.all(
        Array.from(selectedIds).map((id) =>
          fetch(`/api/movies/${id}`, { method: "DELETE" })
        )
      );
      await fetchMovies();
      setSelectedIds(new Set());
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Erro ao excluir filmes:", error);
    } finally {
      setIsSubmitting(false);
    }
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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                isIconOnly
                variant="light"
                onPress={() => router.push("/home")}
                className="text-zinc-400 hover:text-white"
              >
                <ArrowLeft size={24} />
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-white">Editar Filmes</h1>
                <p className="text-zinc-400 mt-1">
                  Gerencie e atualize as informações dos filmes
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400"
              size={20}
            />
            <Input
              placeholder="Buscar por título, gênero ou diretor..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              size="lg"
              classNames={{
                input: "pl-12 bg-zinc-800 text-white",
                inputWrapper: "bg-zinc-800 border-zinc-700 hover:bg-zinc-750",
              }}
            />
          </div>
        </div>

        {/* Actions Bar */}
        {filteredMovies.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                isSelected={
                  selectedIds.size === filteredMovies.length &&
                  filteredMovies.length > 0
                }
                onValueChange={handleSelectAll}
                classNames={{
                  wrapper: "bg-zinc-800 border-zinc-700",
                }}
              >
                <span className="text-white font-medium">Selecionar todos</span>
              </Checkbox>
              {selectedIds.size > 0 && (
                <span className="text-zinc-400 text-sm">
                  {selectedIds.size}{" "}
                  {selectedIds.size === 1
                    ? "filme selecionado"
                    : "filmes selecionados"}
                </span>
              )}
            </div>
            {selectedIds.size > 0 && (
              <Button
                color="danger"
                onPress={() => setIsDeleteModalOpen(true)}
                startContent={<Trash2 size={18} />}
                className="bg-red-600 hover:bg-red-700 font-semibold"
              >
                Excluir Selecionados
              </Button>
            )}
          </div>
        )}

        {/* Movies List */}
        {filteredMovies.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <Search className="mx-auto text-zinc-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum filme encontrado
            </h3>
            <p className="text-zinc-400">Tente buscar com outros termos</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedMovies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      isSelected={selectedIds.has(movie._id)}
                      onValueChange={() => handleSelectMovie(movie._id)}
                      classNames={{
                        wrapper: "bg-zinc-800 border-zinc-700",
                      }}
                    />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {movie.title}
                          </h3>
                          {movie.featured && (
                            <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              DESTAQUE
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                            {new Date(movie.releaseDate).getFullYear()}
                          </span>
                          <span className="bg-zinc-800 text-purple-400 px-3 py-1 rounded-full">
                            {movie.genre}
                          </span>
                          <span className="bg-zinc-800 text-blue-400 px-3 py-1 rounded-full">
                            {movie.director}
                          </span>
                        </div>
                        <p className="text-zinc-400 mt-3 text-sm line-clamp-2">
                          {movie.synopsis}
                        </p>
                      </div>
                      <Button
                        color="primary"
                        onPress={() => handleEdit(movie)}
                        startContent={<Edit2 size={18} />}
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
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
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={{
            title: selectedMovie.title,
            releaseDate: selectedMovie.releaseDate,
            synopsis: selectedMovie.synopsis,
            genre: selectedMovie.genre,
            trailerUrl: selectedMovie.trailerUrl,
            director: selectedMovie.director,
            featured: selectedMovie.featured,
          }}
          mode="edit"
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        classNames={{
          base: "bg-zinc-900 border border-zinc-800",
          header: "border-b border-zinc-800",
          footer: "border-t border-zinc-800",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white">
                  Confirmar Exclusão
                </h3>
              </ModalHeader>
              <ModalBody>
                <p className="text-zinc-300">
                  Tem certeza que deseja excluir {selectedIds.size}{" "}
                  {selectedIds.size === 1 ? "filme" : "filmes"}? Esta ação não
                  pode ser desfeita.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={handleDeleteSelected}
                  isLoading={isSubmitting}
                >
                  Excluir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
