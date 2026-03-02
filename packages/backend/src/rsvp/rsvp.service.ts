import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Guest } from './guest.entity'
import { Party } from './party.entity'
import { RsvpAttendance } from './rsvp-attendance.enum'
import { RsvpMealChoice } from './rsvp-meal-choice.enum'
import { CreateRsvpDto } from './create-rsvp.dto'

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(Party)
    private partyRepo: Repository<Party>,
    @InjectRepository(Guest)
    private guestRepo: Repository<Guest>,
  ) {}

  async update(id: string, updateRsvpDto: CreateRsvpDto): Promise<Party> {
    const party = await this.partyRepo.findOne({
      where: { id },
      relations: { guests: true },
    })
    if (!party) {
      throw new NotFoundException('RSVP not found')
    }

    const trimmedNames = updateRsvpDto.guestNames.map((n) => n.trim()).filter(Boolean)
    if (!trimmedNames.length) {
      throw new BadRequestException('At least one guest name is required')
    }
    this.validateMealChoices(updateRsvpDto.mealChoices, trimmedNames.length)

    party.name = `Party of ${trimmedNames[0]}`
    party.email = updateRsvpDto.email.trim()
    party.phone = updateRsvpDto.phone?.trim() || null
    party.address = updateRsvpDto.address?.trim()
    party.message = updateRsvpDto.message
    party.attendance = updateRsvpDto.attendance
    party.numGuests = trimmedNames.length

    await this.partyRepo.save(party)
    await this.guestRepo.delete({ partyId: party.id })
    const guests = trimmedNames.map((name, i) =>
      this.guestRepo.create({
        name,
        mealChoice: updateRsvpDto.mealChoices[i] ?? RsvpMealChoice.FISH,
        partyId: party.id,
      }),
    )
    await this.guestRepo.save(guests)

    return this.partyRepo.findOneOrFail({
      where: { id: party.id },
      relations: { guests: true },
    })
  }

  async create(createRsvpDto: CreateRsvpDto): Promise<Party> {
    const trimmedNames = createRsvpDto.guestNames.map((n) => n.trim()).filter(Boolean)
    if (!trimmedNames.length) {
      throw new BadRequestException('At least one guest name is required')
    }
    this.validateMealChoices(createRsvpDto.mealChoices, trimmedNames.length)

    const email = createRsvpDto.email.trim()
    const phone = createRsvpDto.phone?.trim() || null
    const partyName = `Party of ${trimmedNames[0]}`

    const qb = this.partyRepo
      .createQueryBuilder('party')
      .where('party.name = :partyName', { partyName })
      .orWhere('party.email = :email', { email })
    if (phone) {
      qb.orWhere('party.phone = :phone', { phone })
    }
    const existing = await qb.getOne()

    if (existing) {
      return this.update(existing.id, createRsvpDto)
    }

    const party = this.partyRepo.create({
      name: partyName,
      numGuests: trimmedNames.length,
      email,
      phone,
      address: createRsvpDto.address?.trim(),
      message: createRsvpDto.message,
      attendance: createRsvpDto.attendance,
    })
    const savedParty = await this.partyRepo.save(party)

    const guests = trimmedNames.map((name, i) =>
      this.guestRepo.create({
        name,
        mealChoice: createRsvpDto.mealChoices[i] ?? RsvpMealChoice.FISH,
        partyId: savedParty.id,
      }),
    )
    await this.guestRepo.save(guests)

    return this.partyRepo.findOneOrFail({
      where: { id: savedParty.id },
      relations: { guests: true },
    })
  }

  async findAll(): Promise<Party[]> {
    return this.partyRepo.find({
      relations: { guests: true },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Party> {
    const party = await this.partyRepo.findOne({
      where: { id },
      relations: { guests: true },
    })
    if (!party) {
      throw new NotFoundException('RSVP not found')
    }
    return party
  }

  async getStats() {
    const total = await this.partyRepo.count()
    const attending = await this.partyRepo.count({
      where: { attendance: RsvpAttendance.YES },
    })
    const totalGuests = await this.partyRepo
      .createQueryBuilder('party')
      .select('SUM(party.num_guests)', 'sum')
      .where('party.attendance = :attendance', {
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

  private validateMealChoices(mealChoices: RsvpMealChoice[], expectedCount: number): void {
    const validChoices = Object.values(RsvpMealChoice)
    if (mealChoices.length !== expectedCount) {
      throw new BadRequestException(
        `Meal choices (${mealChoices.length}) must match guest count (${expectedCount})`,
      )
    }
    for (const choice of mealChoices) {
      if (!validChoices.includes(choice)) {
        throw new BadRequestException(
          `Meal choice must be one of: ${validChoices.join(', ')}`,
        )
      }
    }
  }
}
