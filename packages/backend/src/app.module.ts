import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RsvpModule } from './rsvp/rsvp.module'
import databaseConfig from './typeorm.config'

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), RsvpModule],
})
export class AppModule {}
