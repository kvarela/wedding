import { RsvpAttendance } from './rsvp-attendance.enum'
import { GuestResponse } from './guest-response.interface'

export interface RsvpResponse {
  id: string
  name: string
  email: string
  phone: string | null
  numGuests: number
  guests: GuestResponse[]
  address: string
  message: string | null
  attendance: RsvpAttendance
  createdAt: string
}
