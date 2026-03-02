import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { DataSource } from 'typeorm'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { CreateRsvpDto } from './create-rsvp.dto'
import { Guest } from './guest.entity'
import { Party } from './party.entity'
import { RsvpAttendance } from './rsvp-attendance.enum'
import { RsvpMealChoice } from './rsvp-meal-choice.enum'
import { RsvpResponse } from './rsvp-response.interface'
import { RsvpStatsResponse } from './rsvp-stats-response.interface'
import { clearRsvpTable, createTestApp } from '../test/test-utils'

function buildPayload(overrides: Partial<CreateRsvpDto> = {}): CreateRsvpDto {
  const base = {
    name: 'Karim',
    email: 'karim@example.com',
    phone: '+15550000001',
    guestNames: ['Karim'],
    mealChoices: [RsvpMealChoice.FISH],
    address: '123 Wedding Ave',
    message: 'Happy to celebrate',
    attendance: RsvpAttendance.YES,
    ...overrides,
  }
  if (!('mealChoices' in overrides) && 'guestNames' in overrides) {
    const trimmedCount = base.guestNames.map((n) => n.trim()).filter(Boolean).length
    base.mealChoices = Array(trimmedCount).fill(RsvpMealChoice.FISH)
  }
  return base
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
    expect(created.name).toBe('Party of Karim')
    expect(created.guests.map((g) => g.name)).toEqual(['Karim', 'Felicia'])
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

  it('creates Party and Guest entities in DB on new RSVP', async () => {
    const response = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'DB Check Guest',
          email: 'dbcheck@example.com',
          phone: '+15550000010',
          guestNames: ['Alice', 'Bob'],
          mealChoices: [RsvpMealChoice.STEAK, RsvpMealChoice.CHICKEN],
          address: '456 Test St',
          attendance: RsvpAttendance.YES,
        }),
      )
      .expect(201)

    const created = response.body as RsvpResponse
    const partyRepo = dataSource.getRepository(Party)
    const guestRepo = dataSource.getRepository(Guest)

    const partyInDb = await partyRepo.findOne({ where: { id: created.id } })
    expect(partyInDb).not.toBeNull()
    expect(partyInDb?.name).toBe('Party of Alice')
    expect(partyInDb?.email).toBe('dbcheck@example.com')
    expect(partyInDb?.numGuests).toBe(2)

    const guestsInDb = await guestRepo.find({ where: { partyId: created.id } })
    expect(guestsInDb).toHaveLength(2)
    expect(guestsInDb.map((g) => g.name)).toEqual(['Alice', 'Bob'])
    expect(guestsInDb.map((g) => g.mealChoice)).toEqual([
      RsvpMealChoice.STEAK,
      RsvpMealChoice.CHICKEN,
    ])
  })

  it('returns all RSVPs with GET /rsvp in descending createdAt order', async () => {
    const firstResponse = await request(app.getHttpServer())
      .post('/rsvp')
      .send(
        buildPayload({
          name: 'First Guest',
          email: 'first@example.com',
          phone: '+15550000002',
          guestNames: ['First Guest'],
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
          guestNames: ['Second Guest'],
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
          mealChoices: [RsvpMealChoice.FISH],
        }),
      )
      .expect(400)

    expect(response.body.message).toBe('At least one guest name is required')
  })
})
