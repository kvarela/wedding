import { apiUrl } from './client'

export type RsvpAttendance = 'YES' | 'NO' | 'MAYBE'

export interface CreateRsvpPayload {
  name: string
  email: string
  phone: string
  guests: number
  message?: string
  attendance: RsvpAttendance
}

export interface RsvpResponse {
  id: string
  name: string
  email: string
  phone: string | null
  numGuests: number
  message: string | null
  attendance: RsvpAttendance
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
    throw new Error(body || `RSVP failed (${res.status})`)
  }
  return res.json()
}
