import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreateMealUseCase } from '../create-meal'

export function makeCreateMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createMealsUseCase = new CreateMealUseCase(
    mealsRepository,
    usersRepository,
  )

  return createMealsUseCase
}
