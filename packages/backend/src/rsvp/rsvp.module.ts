import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Guest } from './guest.entity'
import { Party } from './party.entity'
import { RsvpController } from './rsvp.controller'
import { RsvpService } from './rsvp.service'

@Module({
  imports: [TypeOrmModule.forFeature([Party, Guest])],
  controllers: [RsvpController],
  providers: [RsvpService],
})
export class RsvpModule {}
