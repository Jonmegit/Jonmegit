import { useState } from 'react'
import { useStore } from './store'
import axios from './axios'

function App() {
  const { token, login, tasks, fetchTasks } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')

  const handleLogin = async () => {
    try {
      await login(username, password)
      setError('')
      fetchTasks()
    } catch (err) {
      setError('Credenciales invalidas')
    }
  }

  const addTask = async () => {
    try {
      await axios.post('/api/tasks', { title, completed: false }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTitle('')
      fetchTasks()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const markDone = async (id) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed: true }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTasks()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const logout = () => {
    useStore.setState({ token: null, tasks: [] })
    localStorage.removeItem('token')
  }

  if (!token) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          className="border block mb-2"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          className="border block mb-2"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="bg-blue-500 text-white px-2" onClick={handleLogin}>Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Tasks</h1>
      <div className="space-x-2 mb-2">
        <button className="bg-gray-300 px-2" onClick={fetchTasks}>Refresh</button>
        <button className="bg-gray-300 px-2" onClick={logout}>Logout</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} className="mb-1">
            {t.title} - {t.completed ? 'Done' : 'Pending'}
            {!t.completed && (
              <button className="ml-2 bg-green-500 text-white px-1" onClick={() => markDone(t.id)}>
                Marcar como hecha
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          className="border mr-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button className="bg-blue-500 text-white px-2" onClick={addTask}>Añadir</button>
      </div>
    </div>
  )
}

export default App
