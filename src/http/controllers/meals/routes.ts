import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createMeal } from './create-meal'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/meals', createMeal)
}
