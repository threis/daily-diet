import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/meals-repository'

interface FetchMealsUseCaseRequest {
  userId: string
}
interface FetchMealsUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchMealsUseCaseRequest): Promise<FetchMealsUseCaseResponse> {
    const meals = await this.mealsRepository.getManyByUserId(userId)

    return {
      meals,
    }
  }
}
