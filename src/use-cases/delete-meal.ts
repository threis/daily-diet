import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/meals-repository'

import { ResourceNotFoundError } from './errors/meal-not-found-error'

interface DeleteMealUseCaseRequest {
  userId: string
  mealId: string
}
interface DeleteMealUseCaseResponse {
  meal: Meal
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(mealId)

    return {
      meal,
    }
  }
}
