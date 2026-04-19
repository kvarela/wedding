import { apiUrl } from './client'

export async function verifyPassword(password: string): Promise<boolean> {
  const res = await fetch(apiUrl('auth/verify'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  return res.ok
}
