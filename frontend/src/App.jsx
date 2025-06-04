import { useState } from 'react'
import { useStore } from './store'

function App() {
  const { token, login, tasks, fetchTasks } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await login(username, password)
    fetchTasks()
  }

  if (!token) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Login</h1>
        <input className="border" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
        <input className="border" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        <button className="bg-blue-500 text-white px-2" onClick={handleLogin}>Login</button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Tasks</h1>
      <button className="bg-gray-300 px-2" onClick={fetchTasks}>Refresh</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title} - {t.completed ? 'Done' : 'Pending'}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
