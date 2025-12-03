'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/Button'
import { MovieFormModal, MovieFormData } from '@/components/MovieFormModal'
import { Input, Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Pagination } from '@heroui/react'
import { Search, Edit2, Trash2, ArrowLeft } from 'lucide-react'

const mockMovies = [
  { 
    id: '1', 
    title: 'Oppenheimer', 
    releaseDate: '2023-07-21',
    genre: 'Drama',
    director: 'Christopher Nolan',
    synopsis: 'A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.',
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
    featured: true
  },
  { 
    id: '2', 
    title: 'Barbie', 
    releaseDate: '2023-07-21',
    genre: 'Comédia',
    director: 'Greta Gerwig',
    synopsis: 'Barbie e Ken embarcam em uma jornada de autodescoberta quando são expulsos da Barbieland para o mundo real.',
    trailerUrl: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
    featured: true
  },
  { 
    id: '3', 
    title: 'Duna: Parte Dois',
    releaseDate: '2024-03-01',
    genre: 'Ficção Científica',
    director: 'Denis Villeneuve',
    synopsis: 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    featured: false
  },
  { 
    id: '4', 
    title: 'Guardiões da Galáxia Vol. 3',
    releaseDate: '2023-05-05',
    genre: 'Ação',
    director: 'James Gunn',
    synopsis: 'Os Guardiões embarcam em uma missão perigosa para salvar a vida de um dos seus.',
    trailerUrl: 'https://www.youtube.com/watch?v=u3V5KDHRQvk',
    featured: false
  },
  { 
    id: '5', 
    title: 'Homem-Aranha: Através do Aranhaverso',
    releaseDate: '2023-06-02',
    genre: 'Animação',
    director: 'Joaquim Dos Santos',
    synopsis: 'Miles Morales retorna para uma aventura épica através do multiverso com Gwen Stacy e uma equipe de Homens-Aranha.',
    trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
    featured: false
  },
  { 
    id: '6', 
    title: 'John Wick 4: Baba Yaga',
    releaseDate: '2023-03-24',
    genre: 'Ação',
    director: 'Chad Stahelski',
    synopsis: 'John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes que ele possa conquistar sua liberdade, precisa enfrentar um novo inimigo.',
    trailerUrl: 'https://www.youtube.com/watch?v=qEVUtrk8_B4',
    featured: false
  },
]

export default function EditMoviesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMovie, setSelectedMovie] = useState<typeof mockMovies[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex)

  const handleEdit = (movie: typeof mockMovies[0]) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const handleSubmit = (movieData: MovieFormData) => {
    console.log('Atualizando filme:', selectedMovie?.id, movieData)
    // Aqui você integraria com sua API
  }

  const handleSelectMovie = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedIds.size === filteredMovies.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredMovies.map(m => m.id)))
    }
  }

  const handleDeleteSelected = () => {
    console.log('Excluindo filmes:', Array.from(selectedIds))
    // Aqui você integraria com sua API
    setSelectedIds(new Set())
    setIsDeleteModalOpen(false)
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
                onPress={() => router.push('/home')}
                className="text-zinc-400 hover:text-white"
              >
                <ArrowLeft size={24} />
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-white">Editar Filmes</h1>
                <p className="text-zinc-400 mt-1">Gerencie e atualize as informações dos filmes</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
            <Input
              placeholder="Buscar por título, gênero ou diretor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              classNames={{
                input: 'pl-12 bg-zinc-800 text-white',
                inputWrapper: 'bg-zinc-800 border-zinc-700 hover:bg-zinc-750',
              }}
            />
          </div>
        </div>

        {/* Actions Bar */}
        {filteredMovies.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                isSelected={selectedIds.size === filteredMovies.length && filteredMovies.length > 0}
                onValueChange={handleSelectAll}
                classNames={{
                  wrapper: 'bg-zinc-800 border-zinc-700',
                }}
              >
                <span className="text-white font-medium">Selecionar todos</span>
              </Checkbox>
              {selectedIds.size > 0 && (
                <span className="text-zinc-400 text-sm">
                  {selectedIds.size} {selectedIds.size === 1 ? 'filme selecionado' : 'filmes selecionados'}
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
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum filme encontrado</h3>
            <p className="text-zinc-400">Tente buscar com outros termos</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      isSelected={selectedIds.has(movie.id)}
                      onValueChange={() => handleSelectMovie(movie.id)}
                      classNames={{
                        wrapper: 'bg-zinc-800 border-zinc-700',
                      }}
                    />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                          {movie.featured && (
                            <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full font-semibold">DESTAQUE</span>
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
                        <p className="text-zinc-400 mt-3 text-sm line-clamp-2">{movie.synopsis}</p>
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
                    wrapper: 'gap-2',
                    item: 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800',
                    cursor: 'bg-primary text-white',
                    prev: 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800',
                    next: 'bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800',
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
          initialData={selectedMovie}
          mode="edit"
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        classNames={{
          base: 'bg-zinc-900 border border-zinc-800',
          header: 'border-b border-zinc-800',
          footer: 'border-t border-zinc-800',
        }}
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-xl font-bold text-white">Confirmar Exclusão</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-zinc-300">
              Tem certeza que deseja excluir {selectedIds.size} {selectedIds.size === 1 ? 'filme' : 'filmes'}?
            </p>
            <p className="text-zinc-400 text-sm mt-2">
              Esta ação não pode ser desfeita.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={handleDeleteSelected}
              startContent={<Trash2 size={18} />}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
