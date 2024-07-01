import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/meals-repository'

import { MealNotFoundError } from './errors/meal-not-found-error'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  isWithinDiet: boolean
  userId: string
  mealId: string
}
interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    name,
    description,
    isWithinDiet,
    mealId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    meal.name = name
    meal.description = description
    meal.is_within_diet = isWithinDiet

    await this.mealsRepository.save(meal)

    return {
      meal,
    }
  }
}
