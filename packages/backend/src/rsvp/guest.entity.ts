import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Party } from './party.entity'
import { DEFAULT_RSVP_MEAL_CHOICE, type RsvpMealChoice } from './rsvp-meal-choice'

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({
    type: 'varchar',
    length: 64,
    default: DEFAULT_RSVP_MEAL_CHOICE,
  })
  mealChoice: RsvpMealChoice

  @Column({ type: 'uuid' })
  partyId: string

  @ManyToOne(() => Party, (party) => party.guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'party_id' })
  party: Party
}
