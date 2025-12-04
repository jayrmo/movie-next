"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MovieFormModal, MovieFormData } from "@/components/MovieFormModal";
import { useRouter } from "next/navigation";

export default function CreateMoviePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (movieData: MovieFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (res.ok) {
        router.push("/movies");
      } else {
        console.error("Erro ao criar filme");
      }
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    router.push("/movies");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <Navbar />

      <MovieFormModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        mode="create"
        isLoading={isLoading}
      />
    </div>
  );
}
