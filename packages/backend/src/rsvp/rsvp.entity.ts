import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { RsvpAttendance } from './rsvp-attendance.enum'

@Entity('rsvp')
export class Rsvp {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 50, unique: true })
  phone: string

  @Column({ type: 'integer' })
  numGuests: number

  @Column({ type: 'jsonb', default: '[]' })
  guestNames: string[]

  @Column({ type: 'text' })
  address: string

  @Column({ type: 'text', nullable: true })
  message: string

  @Column({ type: 'enum', enum: RsvpAttendance, default: RsvpAttendance.YES })
  attendance: RsvpAttendance

  @CreateDateColumn()
  createdAt: Date
}
