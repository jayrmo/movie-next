import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-zinc-400 mb-6">A página que você está procurando não existe.</p>
        <Link
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
