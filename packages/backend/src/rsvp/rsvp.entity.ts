import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('rsvp')
export class Rsvp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  guests: number;

  @Column({ nullable: true })
  message: string;

  @Column({ default: true })
  attending: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
