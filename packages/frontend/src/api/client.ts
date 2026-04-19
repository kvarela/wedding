export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = import.meta.env.VITE_API_URL
  return base ? `${base}${normalized}` : normalized
}
