import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ClienteDashboard from './pages/ClienteDashboard'
import CooperativaDashboard from './pages/CooperativaDashboard'
import type { Usuario } from './types'

export default function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const salvo = localStorage.getItem('biociclo_usuario')
      return salvo ? JSON.parse(salvo) : null
    } catch {
      return null
    }
  })

  const handleLogin = (user: Usuario) => {
    localStorage.setItem('biociclo_usuario', JSON.stringify(user))
    setUsuario(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('biociclo_usuario')
    setUsuario(null)
  }

  const destino = usuario?.tipo_Usuario === 'Cliente' ? '/cliente' : '/cooperativa'

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={usuario ? <Navigate to={destino} replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/cliente/*"
          element={usuario ? <ClienteDashboard usuario={usuario} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cooperativa/*"
          element={usuario ? <CooperativaDashboard usuario={usuario} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={usuario ? destino : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
