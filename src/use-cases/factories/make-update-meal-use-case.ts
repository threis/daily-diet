import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'

import { UpdateMealUseCase } from '../update-meal'

export function makeUpdateMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const updateMealsUseCase = new UpdateMealUseCase(mealsRepository)

  return updateMealsUseCase
}
