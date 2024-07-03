import { MealsRepository } from '@/repositories/meals-repository'

interface FetchTotalAmountMealsWithinDietUseCaseRequest {
  userId: string
}
interface FetchTotalAmountMealsWithinDietUseCaseResponse {
  totalAmountWithinDiet: number
}

export class FetchTotalAmountMealsWithinDietUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchTotalAmountMealsWithinDietUseCaseRequest): Promise<FetchTotalAmountMealsWithinDietUseCaseResponse> {
    const totalAmountWithinDiet =
      await this.mealsRepository.countTotalAmountWithinDiet(userId)

    return {
      totalAmountWithinDiet,
    }
  }
}
