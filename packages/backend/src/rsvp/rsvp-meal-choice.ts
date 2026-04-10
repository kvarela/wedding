export const RSVP_MEAL_CHOICE_VALUES = ['Filet Mignon', 'Grilled Seabass'] as const

export type RsvpMealChoice = (typeof RSVP_MEAL_CHOICE_VALUES)[number]

export const DEFAULT_RSVP_MEAL_CHOICE: RsvpMealChoice = 'Filet Mignon'
