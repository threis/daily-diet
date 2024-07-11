import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateMealsUseCase } from '@/use-cases/factories/make-update-meal-use-case'

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isWithinDiet: z.boolean(),
  })

  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { name, description, isWithinDiet } = updateMealBodySchema.parse(
    request.body,
  )

  const { id } = updateMealParamsSchema.parse(request.params)

  const updateMealUseCase = makeUpdateMealsUseCase()
  await updateMealUseCase.execute({
    name,
    description,
    isWithinDiet,
    userId: request.user.sub,
    mealId: id,
  })

  reply.status(201).send()
}
