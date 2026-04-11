function apiBase(): string {
  const env = import.meta.env
  if (env.DEV) {
    return ''
  }
  const fromEnv = (env as { VITE_API_URL?: string }).VITE_API_URL?.replace(/\/$/, '') ?? ''
  return fromEnv || 'http://localhost:3001'
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = apiBase()
  return base ? `${base}${normalized}` : normalized
}
