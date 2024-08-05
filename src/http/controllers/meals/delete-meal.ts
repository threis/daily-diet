import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteMealsUseCase } from '@/use-cases/factories/make-delete-meal-use-case'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteMealParamsSchema.parse(request.params)

  const updateMealUseCase = makeDeleteMealsUseCase()
  await updateMealUseCase.execute({ mealId: id, userId: request.user.sub })

  reply.status(201).send()
}
