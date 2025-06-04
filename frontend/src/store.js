import axios from './axios'
import { create } from 'zustand'

export const useStore = create((set, get) => ({
  token: localStorage.getItem('token'),
  tasks: [],
  completed: [],
  summary: null,
  register: async (username, password) => {
    await axios.post('/api/auth/register', { username, password })
  },
  login: async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password })
    localStorage.setItem('token', res.data.token)
    set({ token: res.data.token })
  },
  fetchTasks: async () => {
    const { token } = get()
    const res = await axios.get('/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
    set({ tasks: res.data })
  },
  fetchCompleted: async () => {
    const { token } = get()
    const res = await axios.get('/api/tasks/completed', { headers: { Authorization: `Bearer ${token}` } })
    set({ completed: res.data })
  },
  fetchSummary: async () => {
    const { token } = get()
    const res = await axios.get('/api/tasks/summary', { headers: { Authorization: `Bearer ${token}` } })
    set({ summary: res.data })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, tasks: [], completed: [], summary: null })
  }
}))
