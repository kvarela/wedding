import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { RsvpService, CreateRsvpDto } from './rsvp.service'

@Controller('rsvp')
export class RsvpController {
  constructor(private readonly service: RsvpService) {}

  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    return this.service.create(createRsvpDto)
  }

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get('stats')
  getStats() {
    return this.service.getStats()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }
}
