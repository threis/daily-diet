import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateMealsUseCase } from '@/use-cases/factories/make-create-meal-use-case'

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isWithinDiet: z.boolean(),
  })

  const { name, description, isWithinDiet } = registerBodySchema.parse(
    request.body,
  )

  const createMealUseCase = makeCreateMealsUseCase()
  await createMealUseCase.execute({
    name,
    description,
    isWithinDiet,
    userId: request.user.sub,
  })

  reply.status(201).send()
}
