const rawBase = import.meta.env.VITE_API_URL ?? '/api'
const BASE = rawBase.replace(/\/$/, '')

function buildUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  if (BASE.startsWith('http')) return `${BASE}${p}`
  return `${BASE}${p}`
}

export async function apiFetch(path, options = {}) {
  const url = buildUrl(path)
  const headers = { ...options.headers }
  const token = localStorage.getItem('token')
  if (token) headers.Authorization = `Bearer ${token}`
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(url, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || res.statusText || 'Request failed')
    err.status = res.status
    throw err
  }
  return data
}
