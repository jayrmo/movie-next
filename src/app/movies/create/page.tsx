'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { MovieFormModal, MovieFormData } from '@/components/MovieFormModal'
import { useRouter } from 'next/navigation'

export default function CreateMoviePage() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const handleSubmit = (movieData: MovieFormData) => {
    console.log('Novo filme:', movieData)
    // Aqui você integraria com sua API
    router.push('/movies')
  }

  const handleClose = () => {
    setIsOpen(false)
    router.push('/movies')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />
      
      <MovieFormModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        mode="create"
      />
    </div>
  )
}
