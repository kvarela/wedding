import { apiUrl } from './client'

export type RsvpAttendance = 'YES' | 'NO' | 'MAYBE'
export type RsvpMealChoice = 'Filet Mignon' | 'Grilled Seabass'

export const RSVP_MEAL_OPTIONS = ['Filet Mignon', 'Grilled Seabass'] as const satisfies readonly RsvpMealChoice[]

export const DEFAULT_MEAL_CHOICE: RsvpMealChoice = 'Filet Mignon'

export function normalizeRsvpMealChoice(raw: string): RsvpMealChoice {
  return (RSVP_MEAL_OPTIONS as readonly string[]).includes(raw)
    ? (raw as RsvpMealChoice)
    : DEFAULT_MEAL_CHOICE
}

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

function normalizeRsvpResponse(data: RsvpResponse): RsvpResponse {
  const guestsRaw = data.guests ?? []
  const guests = guestsRaw.map((g) => ({
    ...g,
    mealChoice: normalizeRsvpMealChoice(String(g.mealChoice)),
  }))
  const guestNames =
    data.guestNames?.length ? data.guestNames : guests.map((g) => g.name)
  return { ...data, guests, guestNames }
}

export function getStoredRsvp(): RsvpResponse | null {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as RsvpResponse
    return normalizeRsvpResponse(parsed)
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

function formatRsvpApiMessage(parsed: unknown, fallback: string): string {
  if (typeof parsed !== 'object' || parsed === null || !('message' in parsed)) {
    return fallback
  }
  const raw = (parsed as { message?: unknown }).message
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean).join('. ')
  return fallback
}

function handleRsvpError(res: Response, body: string): never {
  let message = body
  try {
    const parsed: unknown = JSON.parse(body)
    message = formatRsvpApiMessage(parsed, body)
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
  return normalizeRsvpResponse({
    id: party.id,
    name: party.name,
    email: party.email,
    phone: party.phone,
    numGuests: party.numGuests,
    guestNames: guests.map((g) => g.name),
    guests: guests.map((g) => ({
      id: g.id,
      name: g.name,
      mealChoice: normalizeRsvpMealChoice(String(g.mealChoice)),
    })),
    address: party.address,
    message: party.message,
    attendance: party.attendance as RsvpAttendance,
    createdAt: party.createdAt,
  })
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
