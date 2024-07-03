import { MealsRepository } from '@/repositories/meals-repository'

interface FetchTotalAmountBestSequenceMealsWithinDietUseCaseRequest {
  userId: string
}
interface FetchTotalAmountBestSequenceMealsWithinDietUseCaseResponse {
  totalAmountBestSequenceWithinDiet: number
}

export class FetchTotalAmountBestSequenceMealsWithinDietUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchTotalAmountBestSequenceMealsWithinDietUseCaseRequest): Promise<FetchTotalAmountBestSequenceMealsWithinDietUseCaseResponse> {
    const totalAmountBestSequenceWithinDiet =
      await this.mealsRepository.countBestSequenceWithinDiet(userId)

    return {
      totalAmountBestSequenceWithinDiet,
    }
  }
}
