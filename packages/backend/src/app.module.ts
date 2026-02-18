import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RsvpModule } from './rsvp/rsvp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/wedding',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Don't use in production
    }),
    RsvpModule,
  ],
})
export class AppModule {}
