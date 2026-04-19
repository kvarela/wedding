import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { RsvpModule } from './rsvp/rsvp.module'
import databaseConfig from './typeorm.config'

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AuthModule, RsvpModule],
})
export class AppModule {}
