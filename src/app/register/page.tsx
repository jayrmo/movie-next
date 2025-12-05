"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/react";
import { Button } from "@/components/Button";
import { Film, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Por favor, informe seu nome");
      return false;
    }
    if (!email.trim()) {
      setError("Por favor, informe seu email");
      return false;
    }
    if (!email.includes("@")) {
      setError("Por favor, informe um email válido");
      return false;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta");
        return;
      }

      router.push("/home");
    } catch (err) {
      console.error("Erro no registro:", err);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black z-0" />

      {/* Padrão de fundo */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="p-6 sm:p-8">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Film className="text-red-600" size={32} />
            <span className="text-3xl font-bold text-red-600">MovieMatch</span>
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-black/70 backdrop-blur-md rounded-lg p-8 sm:p-12 border border-zinc-800">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Criar Conta
              </h1>
              <p className="text-zinc-400 mb-8">
                Junte-se ao MovieMatch e descubra filmes incríveis
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Input
                    type="text"
                    label="Nome"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isRequired
                    size="lg"
                    classNames={{
                      label: "text-white font-medium",
                      input:
                        "!bg-zinc-800 !text-white placeholder:text-zinc-400",
                      inputWrapper:
                        "!bg-zinc-800 border-zinc-700 hover:!bg-zinc-700 focus-within:!bg-zinc-700 data-[hover=true]:!bg-zinc-700 group-data-[focus=true]:!bg-zinc-700 group-data-[invalid=true]:!bg-zinc-800 group-data-[invalid=true]:border-red-500",
                    }}
                  />
                </div>

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
                      input:
                        "!bg-zinc-800 !text-white placeholder:text-zinc-400",
                      inputWrapper:
                        "!bg-zinc-800 border-zinc-700 hover:!bg-zinc-700 focus-within:!bg-zinc-700 data-[hover=true]:!bg-zinc-700 group-data-[focus=true]:!bg-zinc-700 group-data-[invalid=true]:!bg-zinc-800 group-data-[invalid=true]:border-red-500",
                    }}
                  />
                </div>

                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    label="Senha"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired
                    size="lg"
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    }
                    classNames={{
                      label: "text-white font-medium",
                      input:
                        "!bg-zinc-800 !text-white placeholder:text-zinc-400",
                      inputWrapper:
                        "!bg-zinc-800 border-zinc-700 hover:!bg-zinc-700 focus-within:!bg-zinc-700 data-[hover=true]:!bg-zinc-700 group-data-[focus=true]:!bg-zinc-700 group-data-[invalid=true]:!bg-zinc-800 group-data-[invalid=true]:border-red-500",
                    }}
                  />
                </div>

                <div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirmar senha"
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isRequired
                    size="lg"
                    endContent={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    }
                    classNames={{
                      label: "text-white font-medium",
                      input:
                        "!bg-zinc-800 !text-white placeholder:text-zinc-400",
                      inputWrapper:
                        "!bg-zinc-800 border-zinc-700 hover:!bg-zinc-700 focus-within:!bg-zinc-700 data-[hover=true]:!bg-zinc-700 group-data-[focus=true]:!bg-zinc-700 group-data-[invalid=true]:!bg-zinc-800 group-data-[invalid=true]:border-red-500",
                    }}
                  />
                </div>

                {error && (
                  <div className="bg-red-600/20 border border-red-600 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full bg-red-600 hover:bg-red-700 font-semibold text-base"
                  >
                    Criar Conta
                  </Button>
                </div>
              </form>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-zinc-500 text-sm">ou</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>

                <div className="pt-2">
                  <p className="text-zinc-400 text-sm text-center">
                    Já tem uma conta?{" "}
                    <Link
                      href="/login"
                      className="text-white hover:underline font-semibold"
                    >
                      Entrar
                    </Link>
                  </p>
                </div>

                <p className="text-zinc-500 text-xs text-center pt-4">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white underline"
                  >
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white underline"
                  >
                    Política de Privacidade
                  </a>
                  .
                </p>
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
