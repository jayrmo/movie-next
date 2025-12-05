"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Checkbox,
} from "@heroui/react";
import { Button } from "./Button";
import { useState } from "react";

interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (movieData: MovieFormData) => void;
  initialData?: MovieFormData;
  mode: "create" | "edit";
  isLoading?: boolean;
}

export interface MovieFormData {
  title: string;
  releaseDate: string;
  synopsis: string;
  genre: string;
  trailerUrl?: string;
  director: string;
  featured?: boolean;
}

export function MovieFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isLoading = false,
}: MovieFormModalProps) {
  const defaultFormData: MovieFormData = {
    title: "",
    releaseDate: "",
    synopsis: "",
    genre: "",
    trailerUrl: "",
    director: "",
    featured: false,
  };

  const [formData, setFormData] = useState<MovieFormData>(
    initialData || defaultFormData
  );
  const [prevInitialData, setPrevInitialData] = useState(initialData);
  const [dateError, setDateError] = useState("");

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData);
    if (initialData) {
      setFormData(initialData);
    }
  }

  const validateDate = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const year = new Date(dateStr).getFullYear();
    return year >= 1900 && year <= new Date().getFullYear() + 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDate(formData.releaseDate)) {
      setDateError(
        "Data deve ser entre 1900 e " + (new Date().getFullYear() + 10)
      );
      return;
    }
    setDateError("");
    onSubmit(formData);
  };

  const maxDate = `${new Date().getFullYear() + 10}-12-31`;

  const handleChange = (
    field: keyof MovieFormData,
    value: string | number | boolean
  ) => {
    if (field === "releaseDate" && typeof value === "string" && value) {
      setDateError("");
      const year = new Date(value).getFullYear();
      if (year < 1900 || year > new Date().getFullYear() + 10) {
        setDateError(
          "Ano deve ser entre 1900 e " + (new Date().getFullYear() + 10)
        );
      }
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-slate-900",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader className="flex flex-col gap-3 px-6 pt-6 pb-4 bg-slate-900">
              <button
                type="button"
                onClick={onClose}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 w-fit transition-colors"
              >
                ← Voltar
              </button>
              <h2 className="text-3xl font-bold text-red-500">
                {mode === "create" ? "Adicionar Filme" : "Editar Filme"}
              </h2>
            </ModalHeader>

            <ModalBody className="px-6 py-6 bg-slate-900">
              <div className="space-y-6 bg-slate-800 p-8 rounded-lg">
                <div>
                  <label className="text-white font-medium text-base mb-2 block">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Digite o título do filme"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                    variant="flat"
                    size="lg"
                    classNames={{
                      base: "w-full",
                      input:
                        "bg-slate-700 text-white text-base placeholder:text-slate-400",
                      inputWrapper: "bg-slate-700 hover:bg-slate-600 border-0",
                    }}
                  />
                </div>

                <div>
                  <label className="text-white font-medium text-base mb-2 block">
                    Data de Lançamento <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) =>
                      handleChange("releaseDate", e.target.value)
                    }
                    min="1900-01-01"
                    max={maxDate}
                    required
                    variant="flat"
                    size="lg"
                    classNames={{
                      base: "w-full",
                      input:
                        "bg-slate-700 text-white text-base placeholder:text-slate-400",
                      inputWrapper: dateError
                        ? "bg-slate-700 hover:bg-slate-600 border-2 border-red-500"
                        : "bg-slate-700 hover:bg-slate-600 border-0",
                    }}
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-1">{dateError}</p>
                  )}
                </div>

                <div>
                  <label className="text-white font-medium text-base mb-2 block">
                    Sinopse <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Digite a sinopse do filme"
                    value={formData.synopsis}
                    onChange={(e) => handleChange("synopsis", e.target.value)}
                    required
                    variant="flat"
                    minRows={4}
                    classNames={{
                      base: "w-full",
                      input:
                        "bg-slate-700 text-white text-base placeholder:text-slate-400",
                      inputWrapper: "bg-slate-700 hover:bg-slate-600 border-0",
                    }}
                  />
                </div>

                <div>
                  <label className="text-white font-medium text-base mb-2 block">
                    URL do Trailer (YouTube)
                  </label>
                  <Input
                    placeholder="https://youtube.com/..."
                    value={formData.trailerUrl || ""}
                    onChange={(e) => handleChange("trailerUrl", e.target.value)}
                    variant="flat"
                    size="lg"
                    classNames={{
                      base: "w-full",
                      input:
                        "bg-slate-700 text-white text-base placeholder:text-slate-400",
                      inputWrapper: "bg-slate-700 hover:bg-slate-600 border-0",
                    }}
                  />
                </div>

                <div>
                  <label className="text-white font-medium text-base mb-2 block">
                    Diretor <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Nome do diretor"
                    value={formData.director}
                    onChange={(e) => handleChange("director", e.target.value)}
                    required
                    variant="flat"
                    size="lg"
                    classNames={{
                      base: "w-full",
                      input:
                        "bg-slate-700 text-white text-base placeholder:text-slate-400",
                      inputWrapper: "bg-slate-700 hover:bg-slate-600 border-0",
                    }}
                  />
                </div>

                <div>
                  <label className="text-white font-medium text-base mb-2 block">
                    Gênero <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Ação, Drama, etc."
                    value={formData.genre}
                    onChange={(e) => handleChange("genre", e.target.value)}
                    required
                    variant="flat"
                    size="lg"
                    classNames={{
                      base: "w-full",
                      input:
                        "bg-slate-700 text-white text-base placeholder:text-slate-400",
                      inputWrapper: "bg-slate-700 hover:bg-slate-600 border-0",
                    }}
                  />
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Checkbox
                    isSelected={formData.featured || false}
                    onValueChange={(checked) =>
                      handleChange("featured", checked)
                    }
                    classNames={{
                      wrapper: "bg-slate-700 border-slate-600",
                    }}
                  >
                    <span className="text-white font-medium">
                      Marcar como destaque (aparecerá em destaque na página
                      inicial)
                    </span>
                  </Checkbox>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="px-6 py-4 bg-slate-900">
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="font-medium"
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                type="submit"
                className="font-medium bg-blue-600 hover:bg-blue-700"
                isLoading={isLoading}
              >
                {mode === "create" ? "Adicionar" : "Salvar"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
