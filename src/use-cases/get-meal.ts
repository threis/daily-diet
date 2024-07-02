import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/meals-repository'

import { ResourceNotFoundError } from './errors/meal-not-found-error'

interface GetMealUseCaseRequest {
  id: string
  userId: string
}
interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
    userId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(id)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    return {
      meal,
    }
  }
}
