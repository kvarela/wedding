import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RsvpAttendance } from './rsvp-attendance.enum'
import { Rsvp } from './rsvp.entity'
import { RsvpMealChoice } from './rsvp-meal-choice.enum'
import { CreateRsvpDto } from './create-rsvp.dto'

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(Rsvp)
    private repo: Repository<Rsvp>,
  ) {}

  async update(id: string, updateRsvpDto: CreateRsvpDto): Promise<Rsvp> {
    const rsvp = await this.repo.findOne({ where: { id } })
    if (!rsvp) {
      throw new NotFoundException('RSVP not found')
    }

    const trimmedNames = updateRsvpDto.guestNames.map((n) => n.trim()).filter(Boolean)
    if (!trimmedNames.length) {
      throw new BadRequestException('At least one guest name is required')
    }

    rsvp.name = updateRsvpDto.name.trim()
    rsvp.email = updateRsvpDto.email.trim()
    rsvp.phone = updateRsvpDto.phone.trim()
    rsvp.address = updateRsvpDto.address?.trim()
    rsvp.message = updateRsvpDto.message
    rsvp.attendance = updateRsvpDto.attendance
    rsvp.numGuests = trimmedNames.length
    rsvp.guestNames = trimmedNames

    return this.repo.save(rsvp)
  }

  async create(createRsvpDto: CreateRsvpDto): Promise<Rsvp> {
    const trimmedNames = createRsvpDto.guestNames.map((n) => n.trim()).filter(Boolean)
    if (!trimmedNames.length) {
      throw new BadRequestException('At least one guest name is required')
    }
    const mealChoice = createRsvpDto.mealChoice ?? RsvpMealChoice.FISH
    const validMealChoices = Object.values(RsvpMealChoice)
    if (!validMealChoices.includes(mealChoice)) {
      throw new BadRequestException(
        `Meal choice must be one of: ${validMealChoices.join(', ')}`,
      )
    }
    const name = createRsvpDto.name.trim()
    const email = createRsvpDto.email.trim()
    const phone = createRsvpDto.phone?.trim() || null

    const qb = this.repo
      .createQueryBuilder('rsvp')
      .where('rsvp.name = :name', { name })
      .orWhere('rsvp.email = :email', { email })
    if (phone) {
      qb.orWhere('rsvp.phone = :phone', { phone })
    }
    const existing = await qb.getOne()

    if (existing) {
      existing.name = name
      existing.email = email
      existing.phone = phone
      existing.address = createRsvpDto.address?.trim()
      existing.message = createRsvpDto.message
      existing.attendance = createRsvpDto.attendance
      existing.mealChoice = mealChoice
      existing.numGuests = trimmedNames.length
      existing.guestNames = trimmedNames
      return this.repo.save(existing)
    }

    const rsvp = this.repo.create({
      name,
      email,
      phone,
      address: createRsvpDto.address?.trim(),
      message: createRsvpDto.message,
      attendance: createRsvpDto.attendance,
      mealChoice,
      numGuests: trimmedNames.length,
      guestNames: trimmedNames,
    })
    return this.repo.save(rsvp)
  }

  async findAll(): Promise<Rsvp[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Rsvp> {
    return this.repo.findOne({ where: { id } })
  }

  async getStats() {
    const total = await this.repo.count()
    const attending = await this.repo.count({
      where: { attendance: RsvpAttendance.YES },
    })
    const totalGuests = await this.repo
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
