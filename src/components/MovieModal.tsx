"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Button } from "./Button";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: {
    title: string;
    releaseDate: string;
    genre: string;
    director: string;
    synopsis: string;
    trailerUrl?: string;
  } | null;
}

export function MovieModal({ isOpen, onClose, movie }: MovieModalProps) {
  if (!movie) return null;

  const embedUrl = movie.trailerUrl
    ? getYouTubeEmbedUrl(movie.trailerUrl)
    : null;
  const year = new Date(movie.releaseDate).getFullYear();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-zinc-900 border border-zinc-800",
        header: "border-b border-zinc-800",
        body: "py-6",
        footer: "border-t border-zinc-800",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
              <div className="flex gap-3 text-sm text-zinc-400">
                <span>{year}</span>
                <span>•</span>
                <span>{movie.genre}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-6">
                {embedUrl && (
                  <div
                    className="relative w-full rounded-lg overflow-hidden bg-zinc-800"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={embedUrl}
                      title={movie.title}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Sinopse
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Gênero
                    </h3>
                    <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm">
                      {movie.genre}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Diretor
                    </h3>
                    <p className="text-zinc-300">{movie.director}</p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
