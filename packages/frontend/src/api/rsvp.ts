import { apiUrl } from './client'

export type RsvpAttendance = 'YES' | 'NO' | 'MAYBE'
export type RsvpMealChoice = 'Steak' | 'Chicken' | 'Fish'

export interface GuestResponse {
  id: string
  name: string
  mealChoice: RsvpMealChoice
}

export interface CreateRsvpPayload {
  name: string
  email: string
  phone: string
  guestNames: string[]
  mealChoices: RsvpMealChoice[]
  address: string
  message?: string
  attendance: RsvpAttendance
}

export interface RsvpResponse {
  id: string
  name: string
  email: string
  phone: string | null
  numGuests: number
  guestNames: string[]
  guests: GuestResponse[]
  address: string
  message: string | null
  attendance: RsvpAttendance
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

function toRsvpResponse(party: {
  id: string
  name: string
  email: string
  phone: string | null
  numGuests: number
  address: string
  message: string | null
  attendance: string
  createdAt: string
  guests?: { id: string; name: string; mealChoice: string }[]
}): RsvpResponse {
  const guests = party.guests ?? []
  return {
    id: party.id,
    name: party.name,
    email: party.email,
    phone: party.phone,
    numGuests: party.numGuests,
    guestNames: guests.map((g) => g.name),
    guests: guests.map((g) => ({
      id: g.id,
      name: g.name,
      mealChoice: g.mealChoice as RsvpMealChoice,
    })),
    address: party.address,
    message: party.message,
    attendance: party.attendance as RsvpAttendance,
    createdAt: party.createdAt,
  }
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
  const party = await res.json()
  return toRsvpResponse(party)
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
  const party = await res.json()
  return toRsvpResponse(party)
}
