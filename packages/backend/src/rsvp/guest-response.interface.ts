import type { RsvpMealChoice } from './rsvp-meal-choice'

export interface GuestResponse {
  id: string
  name: string
  mealChoice: RsvpMealChoice
  partyId: string
}
