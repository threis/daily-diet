import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createMeal } from './create-meal'
import { deleteMeal } from './delete-meal'
import { updateMeal } from './update-meal'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/meals', createMeal)
  app.put('/meals/:id', updateMeal)
  app.delete('/meals/:id', deleteMeal)
}
