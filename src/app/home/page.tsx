'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { MovieCard } from '@/components/MovieCard'
import { MovieModal } from '@/components/MovieModal'
import { MovieFormModal, MovieFormData } from '@/components/MovieFormModal'
import { Button } from '@/components/Button'
import { useDisclosure } from '@heroui/react'
import { getYouTubeEmbedUrl } from '@/lib/youtube'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

// Dados mockados de filmes
const mockMovies = [
  {
    id: '1',
    title: 'Oppenheimer',
    releaseDate: '2023-07-21',
    genre: 'Drama',
    director: 'Christopher Nolan',
    synopsis: 'A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.',
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
    featured: true,
  },
  {
    id: '2',
    title: 'Barbie',
    releaseDate: '2023-07-21',
    genre: 'Comédia',
    director: 'Greta Gerwig',
    synopsis: 'Barbie e Ken embarcam em uma jornada de autodescoberta quando são expulsos da Barbieland para o mundo real.',
    trailerUrl: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
    featured: true,
  },
  {
    id: '3',
    title: 'Duna: Parte Dois',
    releaseDate: '2024-03-01',
    genre: 'Ficção Científica',
    director: 'Denis Villeneuve',
    synopsis: 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    featured: false,
  },
  {
    id: '4',
    title: 'Guardiões da Galáxia Vol. 3',
    releaseDate: '2023-05-05',
    genre: 'Ação',
    director: 'James Gunn',
    synopsis: 'Os Guardiões embarcam em uma missão perigosa para salvar a vida de um dos seus.',
    trailerUrl: 'https://www.youtube.com/watch?v=u3V5KDHRQvk',
    featured: false,
  },
  {
    id: '5',
    title: 'Homem-Aranha: Através do Aranhaverso',
    releaseDate: '2023-06-02',
    genre: 'Animação',
    director: 'Joaquim Dos Santos',
    synopsis: 'Miles Morales retorna para uma aventura épica através do multiverso com Gwen Stacy e uma equipe de Homens-Aranha.',
    trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
    featured: false,
  },
  {
    id: '6',
    title: 'John Wick 4: Baba Yaga',
    releaseDate: '2023-03-24',
    genre: 'Ação',
    director: 'Chad Stahelski',
    synopsis: 'John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes que ele possa conquistar sua liberdade, precisa enfrentar um novo inimigo.',
    trailerUrl: 'https://www.youtube.com/watch?v=qEVUtrk8_B4',
    featured: false,
  },
]

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<typeof mockMovies[0] | null>(null)
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure()
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure()
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)

  const featuredMovies = mockMovies.filter(m => m.featured)
  const currentFeatured = featuredMovies[currentFeaturedIndex]
  const embedUrl = currentFeatured?.trailerUrl ? getYouTubeEmbedUrl(currentFeatured.trailerUrl) : null

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredMovies.length)
  }

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)
  }

  const handleOpenDetails = (movie: typeof mockMovies[0]) => {
    setSelectedMovie(movie)
    onDetailsOpen()
  }

  const handleSubmitMovie = (movieData: MovieFormData) => {
    console.log('Novo filme:', movieData)
    // Aqui você integraria com sua API
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
          <div className="flex gap-4 justify-center px-4">
            <Button color="secondary" variant="bordered" size="lg" className="text-sm sm:text-base">
              Explorar Categorias
            </Button>
          </div>
        </section>
        {/* Featured Movie Banner */}
        {currentFeatured && (
          <section className="mb-12">
            <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              {embedUrl && (
                <div className="relative w-full" style={{ paddingBottom: '42%' }}>
                  <iframe
                    src={embedUrl}
                    title={currentFeatured.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-bold">DESTAQUE</span>
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">{currentFeatured.title}</h2>
                <p className="text-zinc-300 text-base md:text-lg mb-4 max-w-4xl line-clamp-3 md:line-clamp-none">{currentFeatured.synopsis}</p>
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
              
              {/* Carousel Controls */}
              {featuredMovies.length > 1 && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all"
                  >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all"
                  >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {featuredMovies.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFeaturedIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentFeaturedIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

       

        {/* Filmes em Destaque */}
        {featuredMovies.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Filmes em Destaque</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {featuredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
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
            {mockMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onOpenDetails={() => handleOpenDetails(movie)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      <MovieModal
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        movie={selectedMovie}
      />
      <MovieFormModal
        isOpen={isFormOpen}
        onClose={onFormClose}
        onSubmit={handleSubmitMovie}
        mode="create"
      />
    </div>
  )
}
