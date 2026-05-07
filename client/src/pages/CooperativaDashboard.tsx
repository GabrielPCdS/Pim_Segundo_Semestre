import { useState } from 'react'
import type { Usuario, Agendamento, StatusColeta } from '../types'

interface Props {
  usuario: Usuario
  onLogout: () => void
}

// ─── Dados provisórios (substituir por chamadas de API) ──────────────────────

const AGENDAMENTOS_MOCK: Agendamento[] = [
  {
    iD_Agendamento: 1,
    data_Agendamento: '2026-04-20T10:00:00',
    status_Coleta: 'Concluído',
    peso_Kg: 12.5,
    endereco_Coleta: 'Rua das Flores, 123 — Centro',
    fK_Usuario: 1, fK_Material: 1,
    material: { iD_Material: 1, descricao: 'Papelão' },
    usuario: { iD_Usuario: 1, nome: 'João Silva', email: 'joao@email.com', tipo_Usuario: 'Cliente' },
  },
  {
    iD_Agendamento: 2,
    data_Agendamento: '2026-04-28T14:30:00',
    status_Coleta: 'Em Coleta',
    peso_Kg: 5.0,
    endereco_Coleta: 'Av. Brasil, 456 — Jardim Primavera',
    fK_Usuario: 2, fK_Material: 2,
    material: { iD_Material: 2, descricao: 'Plástico' },
    usuario: { iD_Usuario: 2, nome: 'Maria Santos', email: 'maria@email.com', tipo_Usuario: 'Cliente' },
  },
  {
    iD_Agendamento: 3,
    data_Agendamento: '2026-05-05T09:00:00',
    status_Coleta: 'Pendente',
    peso_Kg: 8.0,
    endereco_Coleta: 'Rua São Paulo, 789 — Vila Nova',
    fK_Usuario: 3, fK_Material: 3,
    material: { iD_Material: 3, descricao: 'Vidro' },
    usuario: { iD_Usuario: 3, nome: 'Pedro Costa', email: 'pedro@email.com', tipo_Usuario: 'Cliente' },
  },
  {
    iD_Agendamento: 4,
    data_Agendamento: '2026-05-07T11:00:00',
    status_Coleta: 'Pendente',
    peso_Kg: 3.2,
    endereco_Coleta: 'Rua Tiradentes, 321 — Bela Vista',
    fK_Usuario: 4, fK_Material: 4,
    material: { iD_Material: 4, descricao: 'Metal' },
    usuario: { iD_Usuario: 4, nome: 'Ana Oliveira', email: 'ana@email.com', tipo_Usuario: 'Cliente' },
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<StatusColeta, { bg: string; text: string }> = {
  Pendente:    { bg: '#FEF9C3', text: '#854D0E' },
  'Em Coleta': { bg: '#DBEAFE', text: '#1E40AF' },
  Concluído:   { bg: '#DCFCE7', text: '#166534' },
}

const FLUXO_STATUS: StatusColeta[] = ['Pendente', 'Em Coleta', 'Concluído']

function Badge({ status }: { status: StatusColeta }) {
  const s = STATUS_CONFIG[status]
  return (
    <span
      className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {status}
    </span>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

type Filtro = 'Todos' | StatusColeta

export default function CooperativaDashboard({ usuario, onLogout }: Props) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(AGENDAMENTOS_MOCK)
  const [filtro, setFiltro]             = useState<Filtro>('Todos')
  const [atualizando, setAtualizando]   = useState<number | null>(null)

  const lista = filtro === 'Todos'
    ? agendamentos
    : agendamentos.filter(a => a.status_Coleta === filtro)

  const pendentes  = agendamentos.filter(a => a.status_Coleta === 'Pendente').length
  const emColeta   = agendamentos.filter(a => a.status_Coleta === 'Em Coleta').length
  const concluidos = agendamentos.filter(a => a.status_Coleta === 'Concluído').length
  const totalKg    = agendamentos.reduce((s, a) => s + a.peso_Kg, 0)

  const avancarStatus = async (id: number, statusAtual: StatusColeta) => {
    const proximo = FLUXO_STATUS[FLUXO_STATUS.indexOf(statusAtual) + 1]
    if (!proximo) return
    setAtualizando(id)
    try {
      // TODO: integrar com a API
      // await AgendamentoService.atualizarStatus(id, proximo)
      setAgendamentos(prev =>
        prev.map(a => a.iD_Agendamento === id ? { ...a, status_Coleta: proximo } : a)
      )
    } catch {
      alert('Erro ao atualizar status.')
    } finally {
      setAtualizando(null)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBFDF9' }}>

      {/* ── Header ── */}
      <header className="bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1C3B34' }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ color: '#1C3B34' }}>BioCiclo</span>
            <span
              className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
            >
              Cooperativa
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold" style={{ color: '#1C3B34' }}>{usuario.nome}</p>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>Cooperativa</p>
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

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Boas-vindas */}
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#1C3B34' }}>
            Painel da Cooperativa
          </h2>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Gerencie todas as solicitações de coleta de recicláveis.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total de coletas', valor: agendamentos.length, icon: '📦', cor: '#1C3B34' },
            { label: 'Pendentes',        valor: pendentes,           icon: '⏳', cor: '#92400E' },
            { label: 'Em coleta',        valor: emColeta,            icon: '🚛', cor: '#1E40AF' },
            { label: 'Concluídos',       valor: concluidos,          icon: '✅', cor: '#166534' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: '#F3F4F6' }}>
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#9CA3AF' }}>{kpi.label}</p>
              <p className="text-3xl font-extrabold mt-1" style={{ color: kpi.cor }}>{kpi.valor}</p>
            </div>
          ))}
        </div>

        {/* Resumo de peso */}
        <div
          className="rounded-xl p-5 flex items-center justify-between"
          style={{ backgroundColor: '#1C3B34' }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: '#9BC57F' }}>Total de material gerenciado</p>
            <p className="text-4xl font-extrabold text-white mt-1">{totalKg} kg</p>
          </div>
          <div className="text-5xl opacity-20">♻️</div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap">
          {(['Todos', ...FLUXO_STATUS] as Filtro[]).map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="px-4 py-2 rounded-lg text-sm font-semibold border transition"
              style={{
                backgroundColor: filtro === f ? '#1C3B34' : 'white',
                color:           filtro === f ? 'white'   : '#374151',
                borderColor:     filtro === f ? '#1C3B34' : '#D1D5DB',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#F3F4F6' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  {['#', 'Cliente', 'Material', 'Peso', 'Endereço', 'Data', 'Status', 'Ação'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#F3F4F6' }}>
                {lista.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center text-sm" style={{ color: '#9CA3AF' }}>
                      Nenhum agendamento encontrado.
                    </td>
                  </tr>
                ) : lista.map(a => {
                  const proximo = FLUXO_STATUS[FLUXO_STATUS.indexOf(a.status_Coleta) + 1]
                  const carregando = atualizando === a.iD_Agendamento
                  return (
                    <tr key={a.iD_Agendamento} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs" style={{ color: '#9CA3AF' }}>#{a.iD_Agendamento}</td>
                      <td className="px-5 py-4 font-medium" style={{ color: '#111827' }}>{a.usuario?.nome ?? '—'}</td>
                      <td className="px-5 py-4" style={{ color: '#374151' }}>{a.material?.descricao ?? '—'}</td>
                      <td className="px-5 py-4 font-medium" style={{ color: '#374151' }}>{a.peso_Kg} kg</td>
                      <td className="px-5 py-4 max-w-xs" style={{ color: '#374151' }}>
                        <span className="line-clamp-1">{a.endereco_Coleta}</span>
                      </td>
                      <td className="px-5 py-4" style={{ color: '#374151' }}>
                        {new Date(a.data_Agendamento).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-5 py-4"><Badge status={a.status_Coleta} /></td>
                      <td className="px-5 py-4">
                        {proximo ? (
                          <button
                            onClick={() => avancarStatus(a.iD_Agendamento, a.status_Coleta)}
                            disabled={carregando}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition hover:opacity-80"
                            style={{ backgroundColor: carregando ? '#9BC57F' : '#1C3B34' }}
                          >
                            {carregando ? '...' : `→ ${proximo}`}
                          </button>
                        ) : (
                          <span className="text-xs font-semibold" style={{ color: '#9BC57F' }}>✓ Concluído</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}
