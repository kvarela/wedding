import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Party } from './party.entity'
import { RsvpMealChoice } from './rsvp-meal-choice.enum'

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'enum', enum: RsvpMealChoice, default: RsvpMealChoice.FISH })
  mealChoice: RsvpMealChoice

  @Column({ type: 'uuid' })
  partyId: string

  @ManyToOne(() => Party, (party) => party.guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'party_id' })
  party: Party
}
