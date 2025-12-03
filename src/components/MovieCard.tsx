'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react'
import { Button } from './Button'
import { getYouTubeEmbedUrl } from '@/lib/youtube'

interface MovieCardProps {
  id: string
  title: string
  trailerUrl?: string
  releaseDate: string
  genre: string
  featured?: boolean
  onOpenDetails: () => void
}

export function MovieCard({
  title,
  trailerUrl,
  releaseDate,
  genre,
  featured,
  onOpenDetails,
}: MovieCardProps) {
  const embedUrl = trailerUrl ? getYouTubeEmbedUrl(trailerUrl) : null
  const year = new Date(releaseDate).getFullYear()

  return (
    <Card
      isHoverable
      className="w-full bg-zinc-900 border border-zinc-800 data-[hover=true]:bg-zinc-800"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex justify-between items-start w-full">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-lg text-white line-clamp-1">{title}</h4>
              {featured && (
                <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">DESTAQUE</span>
              )}
            </div>
            <p className="text-sm text-zinc-400">{year}</p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {embedUrl ? (
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-zinc-800">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="w-full h-[300px] rounded-xl bg-zinc-800 flex items-center justify-center">
            <p className="text-zinc-500">Sem trailer disponível</p>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">
          {genre}
        </span>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          onPress={onOpenDetails}
        >
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
