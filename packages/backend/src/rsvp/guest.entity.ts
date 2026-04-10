import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Party } from './party.entity'
import { DEFAULT_RSVP_MEAL_CHOICE, RSVP_MEAL_CHOICE_VALUES, type RsvpMealChoice } from './rsvp-meal-choice'

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({
    type: 'enum',
    enum: [...RSVP_MEAL_CHOICE_VALUES],
    default: DEFAULT_RSVP_MEAL_CHOICE,
  })
  mealChoice: RsvpMealChoice

  @Column({ type: 'uuid' })
  partyId: string

  @ManyToOne(() => Party, (party) => party.guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'party_id' })
  party: Party
}
