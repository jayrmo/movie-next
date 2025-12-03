'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Algo deu errado!</h2>
        <p className="text-zinc-400 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
