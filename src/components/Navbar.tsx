"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  key: string;
  label: string;
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        const res = await fetch("/api/movies");
        const movies = await res.json();

        const allGenres = new Set<string>();
        movies.forEach((movie: { genre: string }) => {
          movie.genre.split(/,\s*|;\s*|\s+e\s+/).forEach((g: string) => {
            const trimmed = g.trim();
            if (trimmed) allGenres.add(trimmed);
          });
        });

        const cats = Array.from(allGenres).map((genre) => ({
          key: genre
            .toLowerCase()
            .replace(/\s+/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
          label: genre,
        }));

        if (isMounted) {
          setCategories(cats);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "isAuthenticated=; path=/; max-age=0";
    router.push("/login");
  };

  const crudOptions = [
    { key: "list", label: "Listar Filmes", href: "/movies" },
    { key: "create", label: "Adicionar Filme", href: "/movies/create" },
    { key: "edit", label: "Editar Filmes", href: "/movies/edit" },
  ];

  return (
    <HeroNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-black/90 backdrop-blur-md"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-xl text-white hover:text-primary transition-colors"
          >
            MovieMatch
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link
            href="/home"
            className="text-white/80 hover:text-white transition-colors"
          >
            Início
          </Link>
        </NavbarItem>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                Categorias
                <ChevronDown size={16} />
              </button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Categorias de filmes"
            className="w-[200px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {categories.map((category) => (
              <DropdownItem
                key={category.key}
                as={Link}
                href={`/movies/category/${category.key}`}
              >
                {category.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                Gerenciar Filmes
                <ChevronDown size={16} />
              </button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Gerenciar filmes"
            className="w-[200px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {crudOptions.map((option) => (
              <DropdownItem key={option.key} as={Link} href={option.href}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Link
            href="/movies"
            className="text-white/80 hover:text-white transition-colors"
          >
            Buscar Filme
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/80 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-zinc-900/95 backdrop-blur-md pt-6">
        <NavbarMenuItem>
          <Link
            href="/home"
            className="w-full text-white text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/movies"
            className="w-full text-white text-lg py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            🔍 Buscar
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <p className="text-zinc-400 text-sm font-semibold mt-4 mb-2">
            CATEGORIAS
          </p>
          {categories.map((category) => (
            <Link
              key={category.key}
              href={`/movies/category/${category.key}`}
              className="w-full text-white/80 py-2 pl-4 block hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.label}
            </Link>
          ))}
        </NavbarMenuItem>
        <NavbarMenuItem>
          <p className="text-zinc-400 text-sm font-semibold mt-4 mb-2">
            GERENCIAR FILMES
          </p>
          {crudOptions.map((option) => (
            <Link
              key={option.key}
              href={option.href}
              className="w-full text-white/80 py-2 pl-4 block hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {option.label}
            </Link>
          ))}
        </NavbarMenuItem>
        <NavbarMenuItem>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-300 text-lg py-2 mt-4 flex items-center gap-2"
          >
            <LogOut size={20} />
            Sair
          </button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
}
