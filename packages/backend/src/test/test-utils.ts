import 'reflect-metadata'

import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import { DataType, newDb } from 'pg-mem'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Guest } from '../rsvp/guest.entity'
import { Party } from '../rsvp/party.entity'
import { RsvpModule } from '../rsvp/rsvp.module'

interface TestApp {
  app: INestApplication
  dataSource: DataSource
}

function registerPostgresFunctions() {
  const db = newDb({ autoCreateForeignKeyIndices: true })

  db.public.registerFunction({
    name: 'current_database',
    returns: DataType.text,
    implementation: () => 'wedding_test',
  })

  db.public.registerFunction({
    name: 'version',
    returns: DataType.text,
    implementation: () => '14.0',
  })

  db.public.registerFunction({
    name: 'gen_random_uuid',
    returns: DataType.uuid,
    implementation: () => randomUUID(),
    impure: true,
  })

  db.public.registerFunction({
    name: 'uuid_generate_v4',
    returns: DataType.uuid,
    implementation: () => randomUUID(),
    impure: true,
  })

  return db
}

async function createTestDataSource(options: DataSourceOptions): Promise<DataSource> {
  const db = registerPostgresFunctions()
  const dataSource = db.adapters.createTypeormDataSource(options)
  return dataSource.initialize()
}

export async function createTestApp(): Promise<TestApp> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: () =>
          ({
            type: 'postgres',
            entities: [Party, Guest],
            synchronize: true,
            namingStrategy: new SnakeNamingStrategy(),
          }) satisfies DataSourceOptions,
        dataSourceFactory: async (options) => {
          if (!options) {
            throw new Error('TypeORM options are required for test initialization')
          }
          return createTestDataSource(options as DataSourceOptions)
        },
      }),
      RsvpModule,
    ],
  }).compile()

  const app = moduleFixture.createNestApplication()
  await app.init()

  return {
    app,
    dataSource: moduleFixture.get<DataSource>(getDataSourceToken()),
  }
}

export async function clearRsvpTable(dataSource: DataSource): Promise<void> {
  await dataSource.getRepository(Guest).createQueryBuilder().delete().execute()
  await dataSource.getRepository(Party).createQueryBuilder().delete().execute()
}
