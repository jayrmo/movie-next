"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/react";
import { Button } from "@/components/Button";
import { Film } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulação de login
    setTimeout(() => {
      if (email && password) {
        // Aqui você integraria com sua API de autenticação
        console.log("Login:", { email, password });
        document.cookie = "isAuthenticated=true; path=/; max-age=86400"; // 24 horas
        router.push("/home");
      } else {
        setError("Por favor, preencha todos os campos");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black z-0" />

      {/* Padrão de fundo */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Film className="text-red-600" size={32} />
            <span className="text-3xl font-bold text-red-600">MovieMatch</span>
          </div>
        </header>

        {/* Formulário de Login */}
        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-black/70 backdrop-blur-md rounded-lg p-8 sm:p-12 border border-zinc-800">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                Entrar
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="nome@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                    size="lg"
                    classNames={{
                      label: "text-white font-medium",
                      input: "bg-zinc-800 text-white",
                      inputWrapper:
                        "bg-zinc-800 border-zinc-700 data-[hover=true]:bg-zinc-700 group-data-[focus=true]:bg-zinc-700",
                    }}
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired
                    size="lg"
                    classNames={{
                      label: "text-white font-medium",
                      input: "bg-zinc-800 text-white",
                      inputWrapper:
                        "bg-zinc-800 border-zinc-700 data-[hover=true]:bg-zinc-700 group-data-[focus=true]:bg-zinc-700",
                    }}
                  />
                </div>

                {error && (
                  <div className="bg-red-600/20 border border-red-600 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 font-semibold text-base"
                >
                  Entrar
                </Button>
              </form>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-zinc-400 cursor-pointer hover:text-zinc-300">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-zinc-800 border-zinc-700"
                    />
                    Lembre-se de mim
                  </label>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Precisa de ajuda?
                  </a>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-zinc-400 text-sm">
                    Novo por aqui?{" "}
                    <a
                      href="#"
                      className="text-white hover:underline font-semibold"
                    >
                      Assine agora
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 sm:p-8 text-center">
          <p className="text-zinc-600 text-sm">
            © 2025 MovieMatch. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
