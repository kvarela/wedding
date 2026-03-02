import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'

import { RsvpAttendance } from './rsvp-attendance.enum'
import { Guest } from './guest.entity'

@Entity('party')
export class Party {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'integer' })
  numGuests: number

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 50, unique: true })
  phone: string

  @Column({ type: 'text' })
  address: string

  @Column({ type: 'text', nullable: true })
  message: string

  @Column({ type: 'enum', enum: RsvpAttendance, default: RsvpAttendance.YES })
  attendance: RsvpAttendance

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => Guest, (guest) => guest.party)
  guests: Guest[]
}
