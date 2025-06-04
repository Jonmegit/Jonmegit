import axios from './axios'
import { create } from 'zustand'

export const useStore = create((set, get) => ({
  token: localStorage.getItem('token'),
  tasks: [],
  login: async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password })
    localStorage.setItem('token', res.data.token)
    set({ token: res.data.token })
  },
  fetchTasks: async () => {
    const { token } = get()
    const res = await axios.get('/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
    set({ tasks: res.data })
  }
}))
