import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RsvpModule } from './rsvp/rsvp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'wedding',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Don't use in production
    }),
    RsvpModule,
  ],
})
export class AppModule {}
