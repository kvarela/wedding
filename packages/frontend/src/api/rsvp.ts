import { apiUrl } from './client'

export type RsvpAttendance = 'YES' | 'NO' | 'MAYBE'
export type RsvpMealChoice = 'Steak' | 'Chicken' | 'Fish'

export interface CreateRsvpPayload {
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

export async function createRsvp(payload: CreateRsvpPayload): Promise<RsvpResponse> {
  const res = await fetch(apiUrl('rsvp'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    let message = body
    try {
      const parsed = JSON.parse(body) as { message?: string }
      message = parsed.message ?? body
    } catch {
      // body is not JSON, use as-is
    }
    throw new Error(message || `RSVP failed (${res.status})`)
  }
  return res.json()
}
