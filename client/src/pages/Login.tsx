import { useState } from 'react'
import type { Usuario } from '../types'

interface Props {
  onLogin: (user: Usuario) => void
}

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')

    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos.')
      return
    }

    setCarregando(true)

    try {
      // TODO: substituir pelo serviço de API quando disponível
      // const usuario = await AuthService.login(email, senha)
      // onLogin(usuario)
      setErro('Integração com a API ainda não configurada.')
    } catch {
      setErro('Erro ao conectar com o servidor.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FBFDF9' }}>
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl px-10 py-12">

          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#1C3B34' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: '#1C3B34' }}>BioCiclo</h1>
            <p className="text-sm mt-1" style={{ color: '#37474F' }}>Gestão de Resíduos e Logística Reversa</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#37474F' }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:ring-2"
                style={{ borderColor: '#D1D5DB', focusBorderColor: '#1C3B34' }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#37474F' }}>
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:ring-2"
                style={{ borderColor: '#D1D5DB' }}
              />
            </div>

            {erro && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600">{erro}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-opacity"
              style={{ backgroundColor: '#1C3B34', opacity: carregando ? 0.7 : 1 }}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#9BC57F' }}>
          © {new Date().getFullYear()} BioCiclo · Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}
