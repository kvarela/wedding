import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RsvpAttendance } from './rsvp-attendance.enum'
import { Rsvp } from './rsvp.entity'

export class CreateRsvpDto {
  name: string
  email: string
  phone: string
  guests: number
  message?: string
  attendance: RsvpAttendance
}

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(Rsvp)
    private rsvpRepository: Repository<Rsvp>,
  ) {}

  async create(createRsvpDto: CreateRsvpDto): Promise<Rsvp> {
    const rsvp = this.rsvpRepository.create({
      ...createRsvpDto,
      numGuests: createRsvpDto.guests,
      attendance: createRsvpDto.attendance,
    })
    return this.rsvpRepository.save(rsvp)
  }

  async findAll(): Promise<Rsvp[]> {
    return this.rsvpRepository.find({
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Rsvp> {
    return this.rsvpRepository.findOne({ where: { id } })
  }

  async getStats() {
    const total = await this.rsvpRepository.count()
    const attending = await this.rsvpRepository.count({
      where: { attendance: RsvpAttendance.YES },
    })
    const totalGuests = await this.rsvpRepository
      .createQueryBuilder('rsvp')
      .select('SUM(rsvp.numGuests)', 'sum')
      .where('rsvp.attendance = :attendance', {
        attendance: RsvpAttendance.YES,
      })
      .getRawOne()

    return {
      total,
      attending,
      declined: total - attending,
      totalGuests: parseInt(totalGuests?.sum || '0'),
    }
  }
}
