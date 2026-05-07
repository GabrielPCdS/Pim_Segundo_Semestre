import { useState } from 'react'
import type { Usuario, Agendamento, Material, StatusColeta } from '../types'

interface Props {
  usuario: Usuario
  onLogout: () => void
}

// ─── Dados provisórios (substituir por chamadas de API) ──────────────────────

const MATERIAIS_MOCK: Material[] = [
  { iD_Material: 1, descricao: 'Papelão' },
  { iD_Material: 2, descricao: 'Plástico' },
  { iD_Material: 3, descricao: 'Vidro' },
  { iD_Material: 4, descricao: 'Metal' },
  { iD_Material: 5, descricao: 'Óleo de Cozinha' },
  { iD_Material: 6, descricao: 'Eletrônicos' },
]

const AGENDAMENTOS_MOCK: Agendamento[] = [
  {
    iD_Agendamento: 1,
    data_Agendamento: '2026-04-20T10:00:00',
    status_Coleta: 'Concluído',
    peso_Kg: 12.5,
    endereco_Coleta: 'Rua das Flores, 123 — Centro',
    fK_Usuario: 1,
    fK_Material: 1,
    material: { iD_Material: 1, descricao: 'Papelão' },
  },
  {
    iD_Agendamento: 2,
    data_Agendamento: '2026-04-28T14:30:00',
    status_Coleta: 'Em Coleta',
    peso_Kg: 5.0,
    endereco_Coleta: 'Av. Brasil, 456 — Jardim Primavera',
    fK_Usuario: 1,
    fK_Material: 2,
    material: { iD_Material: 2, descricao: 'Plástico' },
  },
  {
    iD_Agendamento: 3,
    data_Agendamento: '2026-05-05T09:00:00',
    status_Coleta: 'Pendente',
    peso_Kg: 8.0,
    endereco_Coleta: 'Rua São Paulo, 789 — Vila Nova',
    fK_Usuario: 1,
    fK_Material: 3,
    material: { iD_Material: 3, descricao: 'Vidro' },
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<StatusColeta, { bg: string; text: string; label: string }> = {
  Pendente:    { bg: '#FEF9C3', text: '#854D0E', label: 'Pendente' },
  'Em Coleta': { bg: '#DBEAFE', text: '#1E40AF', label: 'Em Coleta' },
  Concluído:   { bg: '#DCFCE7', text: '#166534', label: 'Concluído' },
}

function Badge({ status }: { status: StatusColeta }) {
  const s = STATUS_BADGE[status]
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ClienteDashboard({ usuario, onLogout }: Props) {
  const [agendamentos] = useState<Agendamento[]>(AGENDAMENTOS_MOCK)
  const [showModal, setShowModal] = useState(false)

  // Estatísticas
  const totalKg      = agendamentos.reduce((s, a) => s + a.peso_Kg, 0)
  const totalColetas = agendamentos.length
  const concluidos   = agendamentos.filter(a => a.status_Coleta === 'Concluído').length
  const pendentes    = agendamentos.filter(a => a.status_Coleta === 'Pendente').length

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBFDF9' }}>

      {/* ── Header ── */}
      <header className="bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1C3B34' }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ color: '#1C3B34' }}>BioCiclo</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold" style={{ color: '#1C3B34' }}>{usuario.nome}</p>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>Cliente</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-80"
              style={{ backgroundColor: '#F3F4F6', color: '#37474F' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* ── Conteúdo ── */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Boas-vindas */}
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#1C3B34' }}>
            Olá, {usuario.nome.split(' ')[0]}! 👋
          </h2>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Acompanhe seus agendamentos de coleta de recicláveis.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total coletado',  valor: `${totalKg} kg`,    icon: '⚖️' },
            { label: 'Agendamentos',    valor: totalColetas,         icon: '📋' },
            { label: 'Concluídos',      valor: concluidos,           icon: '✅' },
            { label: 'Pendentes',       valor: pendentes,            icon: '⏳' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#F3F4F6' }}>
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9CA3AF' }}>{kpi.label}</p>
              <p className="text-3xl font-extrabold mt-1" style={{ color: '#1C3B34' }}>{kpi.valor}</p>
            </div>
          ))}
        </div>

        {/* Tabela de agendamentos */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#F3F4F6' }}>
          <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: '#F3F4F6' }}>
            <h3 className="font-bold text-base" style={{ color: '#1C3B34' }}>Meus Agendamentos</h3>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: '#1C3B34' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Agendamento
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  {['Data', 'Material', 'Peso', 'Endereço', 'Status'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#F3F4F6' }}>
                {agendamentos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-sm" style={{ color: '#9CA3AF' }}>
                      Nenhum agendamento cadastrado ainda.
                    </td>
                  </tr>
                ) : agendamentos.map(a => (
                  <tr key={a.iD_Agendamento} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium" style={{ color: '#111827' }}>
                      {new Date(a.data_Agendamento).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4" style={{ color: '#374151' }}>{a.material?.descricao ?? '—'}</td>
                    <td className="px-6 py-4" style={{ color: '#374151' }}>{a.peso_Kg} kg</td>
                    <td className="px-6 py-4 max-w-xs truncate" style={{ color: '#374151' }}>{a.endereco_Coleta}</td>
                    <td className="px-6 py-4"><Badge status={a.status_Coleta} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ── Modal novo agendamento ── */}
      {showModal && (
        <ModalAgendamento
          materiais={MATERIAIS_MOCK}
          usuarioId={usuario.iD_Usuario}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ModalAgendamento({
  materiais,
  usuarioId,
  onClose,
}: {
  materiais: Material[]
  usuarioId: number
  onClose: () => void
}) {
  const [materialId, setMaterialId] = useState('')
  const [pesoKg, setPesoKg]         = useState('')
  const [endereco, setEndereco]      = useState('')
  const [erro, setErro]              = useState('')
  const [enviando, setEnviando]      = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!materialId || !pesoKg || !endereco.trim()) {
      setErro('Preencha todos os campos.')
      return
    }
    setEnviando(true)
    setErro('')
    try {
      // TODO: integrar com a API
      // await AgendamentoService.criar({
      //   fK_Usuario: usuarioId,
      //   fK_Material: Number(materialId),
      //   peso_Kg: Number(pesoKg),
      //   endereco_Coleta: endereco,
      // })
      console.log('Agendamento a criar:', { usuarioId, materialId, pesoKg, endereco })
      onClose()
    } catch {
      setErro('Erro ao criar agendamento. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Header do modal */}
        <div className="px-6 py-5 flex items-center justify-between border-b" style={{ borderColor: '#F3F4F6' }}>
          <h3 className="font-bold text-lg" style={{ color: '#1C3B34' }}>Novo Agendamento</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Material</label>
            <select
              value={materialId}
              onChange={e => setMaterialId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none bg-white"
              style={{ borderColor: '#D1D5DB' }}
            >
              <option value="">Selecione o material</option>
              {materiais.map(m => (
                <option key={m.iD_Material} value={m.iD_Material}>{m.descricao}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Peso estimado (kg)</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={pesoKg}
              onChange={e => setPesoKg(e.target.value)}
              placeholder="Ex: 5.5"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: '#D1D5DB' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Endereço de coleta</label>
            <input
              type="text"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              placeholder="Rua, número, bairro"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: '#D1D5DB' }}
            />
          </div>

          {erro && <p className="text-sm text-red-500">{erro}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border transition hover:bg-gray-50"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: '#1C3B34', opacity: enviando ? 0.7 : 1 }}
            >
              {enviando ? 'Salvando...' : 'Agendar Coleta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
