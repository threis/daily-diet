import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { ResourceNotFoundError } from '@/use-cases/errors/meal-not-found-error'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Delete Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to delete a meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirst({
      where: { email: 'john.doe@example.com' },
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meal = await prisma.meal.create({
      data: {
        name: 'meal-test',
        description: 'description-test',
        is_within_diet: true,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .delete(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const IsMealExist = await prisma.meal.findUnique({ where: { id: meal.id } })

    expect(response.statusCode).toEqual(201)
    expect(IsMealExist).toBeNull()
  })
})
