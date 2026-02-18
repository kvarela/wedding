import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rsvp } from './rsvp.entity';

export class CreateRsvpDto {
  name: string;
  email: string;
  guests: number;
  message?: string;
  attending: boolean;
}

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(Rsvp)
    private rsvpRepository: Repository<Rsvp>,
  ) {}

  async create(createRsvpDto: CreateRsvpDto): Promise<Rsvp> {
    const rsvp = this.rsvpRepository.create(createRsvpDto);
    return this.rsvpRepository.save(rsvp);
  }

  async findAll(): Promise<Rsvp[]> {
    return this.rsvpRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Rsvp> {
    return this.rsvpRepository.findOne({ where: { id } });
  }

  async getStats() {
    const total = await this.rsvpRepository.count();
    const attending = await this.rsvpRepository.count({ where: { attending: true } });
    const totalGuests = await this.rsvpRepository
      .createQueryBuilder('rsvp')
      .select('SUM(rsvp.guests)', 'sum')
      .where('rsvp.attending = :attending', { attending: true })
      .getRawOne();

    return {
      total,
      attending,
      declined: total - attending,
      totalGuests: parseInt(totalGuests?.sum || '0'),
    };
  }
}
