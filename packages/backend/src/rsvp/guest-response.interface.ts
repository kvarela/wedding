import { RsvpMealChoice } from './rsvp-meal-choice.enum'

export interface GuestResponse {
  id: string
  name: string
  mealChoice: RsvpMealChoice
  partyId: string
}
