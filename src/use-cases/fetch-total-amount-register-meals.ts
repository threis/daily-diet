import { MealsRepository } from '@/repositories/meals-repository'

interface FetchTotalAmountRegisterMealsUseCaseRequest {
  userId: string
}
interface FetchTotalAmountRegisterMealsUseCaseResponse {
  totalAmount: number
}

export class FetchTotalAmountRegisterMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
  }: FetchTotalAmountRegisterMealsUseCaseRequest): Promise<FetchTotalAmountRegisterMealsUseCaseResponse> {
    const totalAmount = await this.mealsRepository.countTotalAmount(userId)

    return {
      totalAmount,
    }
  }
}
