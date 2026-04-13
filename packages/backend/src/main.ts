import 'reflect-metadata'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

function corsOrigins(): string[] {
  const fromEnv = (process.env.FRONTEND_URL ?? '')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean)
  return [
    ...new Set([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://karimandfelicia.wedding',
      'https://www.karimandfelicia.wedding',
      ...fromEnv,
    ]),
  ]
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors({ origin: corsOrigins(), credentials: true })

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`🚀 Backend server is running on http://localhost:${port}`)
}

bootstrap()
