import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { FetchTotalAmountRegisterMealsUseCase } from './fetch-total-amount-register-meals'

let mealsRepository: InMemoryMealsRepository
let sut: FetchTotalAmountRegisterMealsUseCase

describe('Fetch Total Amount Register Meals Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchTotalAmountRegisterMealsUseCase(mealsRepository)
  })

  it('should be able to get total amount register meals by user id', async () => {
    await mealsRepository.create({
      name: 'meal-created-1',
      description: 'meal-descrition-created-1',
      created_at: new Date(),
      user_id: 'user-id-1',
      is_within_diet: true,
    })

    await mealsRepository.create({
      name: 'meal-created-2',
      description: 'meal-descrition-created-2',
      created_at: new Date(),
      user_id: 'user-id-1',
      is_within_diet: true,
    })

    await mealsRepository.create({
      name: 'meal-created-3',
      description: 'meal-descrition-created-3',
      created_at: new Date(),
      user_id: 'user-id-2',
      is_within_diet: true,
    })

    const { totalAmount } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(totalAmount).toEqual(2)
  })
})
