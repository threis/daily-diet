import { MealsRepository } from '@/repositories/meals-repository'

interface FetchTotalAmountNonDietaryMealsUseCaseRequest {
  userId: string
}
interface FetchTotalAmountNonDietaryMealsUseCaseResponse {
  totalAmountWithinDiet: number
}

export class FetchTotalAmountNonDietaryMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchTotalAmountNonDietaryMealsUseCaseRequest): Promise<FetchTotalAmountNonDietaryMealsUseCaseResponse> {
    const totalAmountWithinDiet =
      await this.mealsRepository.countTotalAmountNonDietary(userId)

    return {
      totalAmountWithinDiet,
    }
  }
}
