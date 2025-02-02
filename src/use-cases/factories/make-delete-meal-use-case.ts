import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'

import { DeleteMealUseCase } from '../delete-meal'

export function makeDeleteMealsUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const deleteMealUseCase = new DeleteMealUseCase(mealsRepository)

  return deleteMealUseCase
}
