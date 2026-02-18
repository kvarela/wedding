import * as dotenv from 'dotenv'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSourceOptions } from 'typeorm'
import { join } from 'path'

dotenv.config()

const isTest = process.env.NODE_ENV === 'test'
const dbUrl = isTest ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: dbUrl,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true, // TODO: Disable in production
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    connectionLimit: 20,
  },
}

export default databaseConfig
