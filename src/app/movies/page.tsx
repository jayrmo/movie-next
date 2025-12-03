'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { MovieCard } from '@/components/MovieCard'
import { MovieModal } from '@/components/MovieModal'
import { Input } from '@heroui/react'
import { Search } from 'lucide-react'

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

export default function MoviesPage() {
  const [selectedMovie, setSelectedMovie] = useState<typeof mockMovies[0] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMovies = mockMovies.filter((movie) => {
    const query = searchQuery.toLowerCase()
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query) ||
      movie.synopsis.toLowerCase().includes(query)
    )
  })

  const handleOpenDetails = (movie: typeof mockMovies[0]) => {
    setSelectedMovie(movie)
    setIsOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Todos os Filmes</h1>
          <Input
            placeholder="Buscar por título, gênero, diretor ou sinopse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="text-zinc-400" size={20} />}
            classNames={{
              base: 'max-w-2xl',
              input: 'text-white',
              inputWrapper: 'bg-zinc-800 border-zinc-700 data-[hover=true]:bg-zinc-700 group-data-[focus=true]:bg-zinc-700',
            }}
            size="lg"
          />
          {searchQuery && (
            <p className="text-zinc-400 mt-2">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'filme encontrado' : 'filmes encontrados'}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onOpenDetails={() => handleOpenDetails(movie)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-400 text-lg">Nenhum filme encontrado com "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <MovieModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        movie={selectedMovie}
      />
    </div>
  )
}
