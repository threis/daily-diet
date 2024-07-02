import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { FetchMealsUseCase } from './fetch-meals'

let mealsRepository: InMemoryMealsRepository
let sut: FetchMealsUseCase

describe('Fetch Meals Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchMealsUseCase(mealsRepository)
  })

  it('should be able to fetch meals', async () => {
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

    const { meals } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual([
      expect.objectContaining({ name: 'meal-created-1' }),
      expect.objectContaining({ name: 'meal-created-2' }),
    ])
  })
})
