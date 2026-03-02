import { apiUrl } from './client'

export type RsvpAttendance = 'YES' | 'NO' | 'MAYBE'
export type RsvpMealChoice = 'Steak' | 'Chicken' | 'Fish'

export interface CreateRsvpPayload {
  name: string
  email: string
  phone: string
  guestNames: string[]
  address: string
  message?: string
  attendance: RsvpAttendance
  mealChoice: RsvpMealChoice
}

export interface RsvpResponse {
  id: string
  name: string
  email: string
  phone: string | null
  numGuests: number
  guestNames: string[]
  address: string
  message: string | null
  attendance: RsvpAttendance
  mealChoice: RsvpMealChoice
  createdAt: string
}

const RSVP_STORAGE_KEY = 'wedding-rsvp'

export function getStoredRsvp(): RsvpResponse | null {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as RsvpResponse
  } catch {
    return null
  }
}

export function storeRsvp(rsvp: RsvpResponse): void {
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvp))
}

async function rsvpFetch(
  url: string,
  options: { method: string; body?: string },
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
  })
}

function handleRsvpError(res: Response, body: string): never {
  let message = body
  try {
    const parsed = JSON.parse(body) as { message?: string }
    message = parsed.message ?? body
  } catch {
    // body is not JSON, use as-is
  }
  throw new Error(message || `RSVP failed (${res.status})`)
}

export async function createRsvp(payload: CreateRsvpPayload): Promise<RsvpResponse> {
  const res = await rsvpFetch(apiUrl('rsvp'), {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    handleRsvpError(res, body)
  }
  return res.json()
}

export async function updateRsvp(id: string, payload: CreateRsvpPayload): Promise<RsvpResponse> {
  const res = await rsvpFetch(apiUrl(`rsvp/${id}`), {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    handleRsvpError(res, body)
  }
  return res.json()
}
