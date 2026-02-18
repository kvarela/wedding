import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RsvpController } from './rsvp.controller';
import { RsvpService } from './rsvp.service';
import { Rsvp } from './rsvp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rsvp])],
  controllers: [RsvpController],
  providers: [RsvpService],
})
export class RsvpModule {}
