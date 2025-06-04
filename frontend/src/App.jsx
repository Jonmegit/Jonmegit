import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useStore } from './store'
import axios from './axios'

function Login() {
  const { login, register } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await register(username, password)
      }
      await login(username, password)
    } catch (err) {
      setError('Credenciales invalidas')
      return
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{isRegister ? 'Registro' : 'Login'}</h1>
      <input className="border block mb-2" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
      <input className="border block mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button className="bg-blue-500 text-white px-2" onClick={handleSubmit}>{isRegister ? 'Registrar' : 'Login'}</button>
      <button className="ml-2 underline" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Iniciar sesión' : 'Crear cuenta'}</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

function Tasks() {
  const { token, tasks, fetchTasks, fetchCompleted, completed, fetchSummary, summary } = useStore()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [prio, setPrio] = useState('Low')
  const [due, setDue] = useState('')

  useEffect(() => {
    fetchTasks()
    fetchCompleted()
    fetchSummary()
  }, [fetchTasks, fetchCompleted, fetchSummary])

  const addTask = async () => {
    try {
      await axios.post('/api/tasks', { team_id: 1, title, description: desc, priority: prio, due_date: due }, { headers: { Authorization: `Bearer ${token}` } })
      setTitle(''); setDesc(''); setDue('')
      fetchTasks()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const markDone = async (id) => {
    await axios.patch(`/api/tasks/${id}/complete`, {}, { headers: { Authorization: `Bearer ${token}` } })
    fetchTasks(); fetchCompleted(); fetchSummary()
  }

  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <Link className="underline" to="/completed">Completadas</Link>
        <Link className="underline" to="/summary">Resumen</Link>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} className="mb-1">
            {t.title} - {t.completed ? 'Hecha' : 'Pendiente'}
            {!t.completed && <button className="ml-2 bg-green-500 text-white px-1" onClick={() => markDone(t.id)}>OK</button>}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-x-2">
        <input className="border" value={title} onChange={e => setTitle(e.target.value)} placeholder="título" />
        <input className="border" value={desc} onChange={e => setDesc(e.target.value)} placeholder="desc" />
        <input className="border" value={prio} onChange={e => setPrio(e.target.value)} placeholder="prioridad" />
        <input className="border" value={due} onChange={e => setDue(e.target.value)} placeholder="fecha" />
        <button className="bg-blue-500 text-white px-2" onClick={addTask}>Añadir</button>
      </div>
    </div>
  )
}

function Completed() {
  const { completed } = useStore()
  return (
    <div>
      <Link className="underline" to="/">Volver</Link>
      <h2 className="font-bold">Completadas</h2>
      <ul>
        {completed.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  )
}

function Summary() {
  const { summary } = useStore()
  return (
    <div>
      <Link className="underline" to="/">Volver</Link>
      {summary && <p>Total: {summary.total} - Completadas: {summary.completed}</p>}
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { token } = useStore()
  if (!token) return <Navigate to="/login" />
  return children
}

function App() {
  const { token, logout } = useStore()
  return (
    <BrowserRouter>
      <div className="p-4">
        {token && <button className="mb-2 bg-gray-300 px-2" onClick={logout}>Logout</button>}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/completed" element={<ProtectedRoute><Completed /></ProtectedRoute>} />
          <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
