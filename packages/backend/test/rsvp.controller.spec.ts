import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { DataSource } from 'typeorm'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { RsvpAttendance } from '../src/rsvp/rsvp-attendance.enum'
import { clearRsvpTable, createTestApp } from './test-utils'

interface CreateRsvpPayload {
  name: string
  email: string
  phone: string
  guestNames: string[]
  address: string
  message?: string
  attendance: RsvpAttendance
}

interface RsvpResponse {
  id: string
  name: string
  email: string
  phone: string | null
  numGuests: number
  guestNames: string[]
  address: string
  message: string | null
  attendance: RsvpAttendance
  createdAt: string
}

interface RsvpStatsResponse {
  total: number
  attending: number
  declined: number
  totalGuests: number
}

function buildPayload(overrides: Partial<CreateRsvpPayload> = {}): CreateRsvpPayload {
  return {
    name: 'Karim',
    email: 'karim@example.com',
    phone: '+15550000001',
    guestNames: ['Karim'],
    address: '123 Wedding Ave',
    message: 'Happy to celebrate',
    attendance: RsvpAttendance.YES,
    ...overrides,
  }
}

describe('RsvpController (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource

  beforeAll(async () => {
    const testApp = await createTestApp()
    app = testApp.app
    dataSource = testApp.dataSource
  })

  beforeEach(async () => {
    await clearRsvpTable(dataSource)
  })

  afterAll(async () => {
    if (dataSource?.isInitialized) {
      await dataSource.destroy()
    }
    if (app) {
      await app.close()
    }
  })

  it('creates and updates an RSVP with POST /rsvp', async () => {
    const createdResponse = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          guestNames: [' Karim ', ' ', 'Felicia'],
        }),
      )
      .expect(201)

    const created = createdResponse.body as RsvpResponse
    expect(created.name).toBe('Karim')
    expect(created.guestNames).toEqual(['Karim', 'Felicia'])
    expect(created.numGuests).toBe(2)

    const updatedResponse = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          email: 'karim@example.com',
          phone: '+15550000009',
          guestNames: ['Karim', 'Felicia', 'Guest'],
          attendance: RsvpAttendance.MAYBE,
        }),
      )
      .expect(201)

    const updated = updatedResponse.body as RsvpResponse
    expect(updated.id).toBe(created.id)
    expect(updated.phone).toBe('+15550000009')
    expect(updated.numGuests).toBe(3)
    expect(updated.attendance).toBe(RsvpAttendance.MAYBE)
  })

  it('returns all RSVPs with GET /rsvp in descending createdAt order', async () => {
    const firstResponse = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'First Guest',
          email: 'first@example.com',
          phone: '+15550000002',
        }),
      )
      .expect(201)

    await new Promise((resolve) => setTimeout(resolve, 5))

    const secondResponse = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'Second Guest',
          email: 'second@example.com',
          phone: '+15550000003',
        }),
      )
      .expect(201)

    const response = await request(app.getHttpServer()).get('/rsvp').expect(200)
    const body = response.body as RsvpResponse[]

    expect(body).toHaveLength(2)
    expect(body.map((item) => item.id)).toEqual([
      (secondResponse.body as RsvpResponse).id,
      (firstResponse.body as RsvpResponse).id,
    ])
  })

  it('returns one RSVP with GET /rsvp/:id', async () => {
    const createdResponse = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'Lookup Guest',
          email: 'lookup@example.com',
          phone: '+15550000004',
        }),
      )
      .expect(201)

    const created = createdResponse.body as RsvpResponse

    const response = await request(app.getHttpServer()).get(`/rsvp/${created.id}`).expect(200)
    const body = response.body as RsvpResponse

    expect(body.id).toBe(created.id)
    expect(body.email).toBe('lookup@example.com')
  })

  it('returns aggregated RSVP stats with GET /rsvp/stats', async () => {
    await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'Attending Guest',
          email: 'attending@example.com',
          phone: '+15550000005',
          guestNames: ['Attending Guest', 'Plus One'],
          attendance: RsvpAttendance.YES,
        }),
      )
      .expect(201)

    await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'Declined Guest',
          email: 'declined@example.com',
          phone: '+15550000006',
          guestNames: ['Declined Guest'],
          attendance: RsvpAttendance.NO,
        }),
      )
      .expect(201)

    const response = await request(app.getHttpServer()).get('/rsvp/stats').expect(200)
    const body = response.body as RsvpStatsResponse

    expect(body).toEqual({
      total: 2,
      attending: 1,
      declined: 1,
      totalGuests: 2,
    })
  })

  it('rejects RSVP creation with empty guest names', async () => {
    const response = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'Invalid Guest',
          email: 'invalid@example.com',
          phone: '+15550000007',
          guestNames: [' ', ''],
        }),
      )
      .expect(400)

    expect(response.body.message).toBe('At least one guest name is required')
  })
})
