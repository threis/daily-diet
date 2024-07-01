import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/meals-repository'

import { MealNotFoundError } from './errors/meal-not-found-error'

interface UpdateMealUseCaseRequest {
  name: string
  description: string
  isWithinDiet: boolean
  userId: string
  mealId: string
}
interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    name,
    description,
    isWithinDiet,
    mealId,
  }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
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
