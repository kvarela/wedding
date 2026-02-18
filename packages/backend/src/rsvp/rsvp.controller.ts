import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RsvpService, CreateRsvpDto } from './rsvp.service';

@Controller('api/rsvp')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post()
  create(@Body() createRsvpDto: CreateRsvpDto) {
    return this.rsvpService.create(createRsvpDto);
  }

  @Get()
  findAll() {
    return this.rsvpService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.rsvpService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rsvpService.findOne(id);
  }
}
