// ─── Entidades principais ───────────────────────────────────────────────────

export interface Usuario {
  iD_Usuario: number
  nome: string
  email: string
  tipo_Usuario: 'Cliente' | 'Cooperativa'
}

export interface Material {
  iD_Material: number
  descricao: string
}

export type StatusColeta = 'Pendente' | 'Em Coleta' | 'Concluído'

export interface Agendamento {
  iD_Agendamento: number
  data_Agendamento: string
  status_Coleta: StatusColeta
  peso_Kg: number
  endereco_Coleta: string
  fK_Usuario: number
  fK_Material: number
  material?: Material
  usuario?: Usuario
}

// ─── DTOs para criação ───────────────────────────────────────────────────────

export interface LoginDto {
  email: string
  senha: string
}

export interface CriarAgendamentoDto {
  fK_Usuario: number
  fK_Material: number
  peso_Kg: number
  endereco_Coleta: string
}
