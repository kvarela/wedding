import { Controller, Get, Patch, Post, Body, Param, Inject } from '@nestjs/common'

import { CreateRsvpDto } from './create-rsvp.dto'
import { RsvpResponse } from './rsvp-response.interface'
import { RsvpStatsResponse } from './rsvp-stats-response.interface'
import { RsvpService } from './rsvp.service'

@Controller('rsvp')
export class RsvpController {
  constructor(
    @Inject(RsvpService) private readonly service: RsvpService,
  ) {}

  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto): Promise<RsvpResponse> {
    return this.service.create(createRsvpDto)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRsvpDto: CreateRsvpDto,
  ): Promise<RsvpResponse> {
    return this.service.update(id, updateRsvpDto)
  }

  @Get()
  findAll(): Promise<RsvpResponse[]> {
    return this.service.findAll()
  }

  @Get('stats')
  getStats(): Promise<RsvpStatsResponse> {
    return this.service.getStats()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RsvpResponse> {
    return this.service.findOne(id)
  }
}
