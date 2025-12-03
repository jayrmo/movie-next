'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { MovieCard } from '@/components/MovieCard'
import { MovieModal } from '@/components/MovieModal'
import { Button } from '@/components/Button'
import { ArrowLeft } from 'lucide-react'

const mockMovies = [
  {
    id: '1',
    title: 'Oppenheimer',
    releaseDate: '2023-07-21',
    genre: 'Drama',
    director: 'Christopher Nolan',
    synopsis: 'A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.',
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
  },
  {
    id: '2',
    title: 'Barbie',
    releaseDate: '2023-07-21',
    genre: 'Comédia',
    director: 'Greta Gerwig',
    synopsis: 'Barbie e Ken embarcam em uma jornada de autodescoberta quando são expulsos da Barbieland para o mundo real.',
    trailerUrl: 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
  },
  {
    id: '3',
    title: 'Duna: Parte Dois',
    releaseDate: '2024-03-01',
    genre: 'Ficção Científica',
    director: 'Denis Villeneuve',
    synopsis: 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
  },
  {
    id: '4',
    title: 'Guardiões da Galáxia Vol. 3',
    releaseDate: '2023-05-05',
    genre: 'Ação',
    director: 'James Gunn',
    synopsis: 'Os Guardiões embarcam em uma missão perigosa para salvar a vida de um dos seus.',
    trailerUrl: 'https://www.youtube.com/watch?v=u3V5KDHRQvk',
  },
  {
    id: '5',
    title: 'Homem-Aranha: Através do Aranhaverso',
    releaseDate: '2023-06-02',
    genre: 'Animação',
    director: 'Joaquim Dos Santos',
    synopsis: 'Miles Morales retorna para uma aventura épica através do multiverso com Gwen Stacy e uma equipe de Homens-Aranha.',
    trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
  },
  {
    id: '6',
    title: 'John Wick 4: Baba Yaga',
    releaseDate: '2023-03-24',
    genre: 'Ação',
    director: 'Chad Stahelski',
    synopsis: 'John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes que ele possa conquistar sua liberdade, precisa enfrentar um novo inimigo.',
    trailerUrl: 'https://www.youtube.com/watch?v=qEVUtrk8_B4',
  },
]

const categoryMap: { [key: string]: string } = {
  action: 'Ação',
  comedy: 'Comédia',
  drama: 'Drama',
  horror: 'Terror',
  scifi: 'Ficção Científica',
  romance: 'Romance',
  thriller: 'Suspense',
  animation: 'Animação',
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string
  const categoryName = categoryMap[category] || category
  
  const [selectedMovie, setSelectedMovie] = useState<typeof mockMovies[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredMovies = mockMovies.filter(
    movie => movie.genre.toLowerCase() === categoryName.toLowerCase()
  )

  const handleOpenDetails = (movie: typeof mockMovies[0]) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
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
              onPress={() => router.push('/home')}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-white">Filmes de {categoryName}</h1>
              <p className="text-zinc-400 mt-1">
                {filteredMovies.length} {filteredMovies.length === 1 ? 'filme encontrado' : 'filmes encontrados'}
              </p>
            </div>
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum filme encontrado</h3>
            <p className="text-zinc-400">Não há filmes cadastrados nesta categoria ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onOpenDetails={() => handleOpenDetails(movie)}
              />
            ))}
          </div>
        )}
      </main>

      <MovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedMovie}
      />
    </div>
  )
}
