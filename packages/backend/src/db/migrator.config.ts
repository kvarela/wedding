import { DataSource } from 'typeorm'
import databaseConfig from '../typeorm.config'

export default new DataSource({
  ...databaseConfig,
  migrations: ['./dist/src/db/migrations/*.js'],
})
