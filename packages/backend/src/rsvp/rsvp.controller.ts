import { Controller, Get, Patch, Post, Body, Param, Inject } from '@nestjs/common'

import { CreateRsvpDto } from './create-rsvp.dto'
import { RsvpService } from './rsvp.service'

@Controller('rsvp')
export class RsvpController {
  constructor(
    @Inject(RsvpService) private readonly service: RsvpService,
  ) {}

  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    return this.service.create(createRsvpDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRsvpDto: CreateRsvpDto) {
    return this.service.update(id, updateRsvpDto)
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
