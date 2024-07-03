import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { FetchTotalAmountMealsWithinDietUseCase } from './fetch-total-amount-meals-within-diet'

let mealsRepository: InMemoryMealsRepository
let sut: FetchTotalAmountMealsWithinDietUseCase

describe('Fetch Total Amount Meals Within Diet Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchTotalAmountMealsWithinDietUseCase(mealsRepository)
  })

  it('should be able to get total amount meals within diet by user id', async () => {
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
      user_id: 'user-id-1',
      is_within_diet: false,
    })

    await mealsRepository.create({
      name: 'meal-created-4',
      description: 'meal-descrition-created-4',
      created_at: new Date(),
      user_id: 'user-id-2',
      is_within_diet: true,
    })

    await mealsRepository.create({
      name: 'meal-created-5',
      description: 'meal-descrition-created-5',
      created_at: new Date(),
      user_id: 'user-id-2',
      is_within_diet: true,
    })

    const { totalAmountWithinDiet } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(totalAmountWithinDiet).toEqual(2)
  })
})
