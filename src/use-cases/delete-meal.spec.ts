import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { DeleteMealUseCase } from './delete-meal'
import { ResourceNotFoundError } from './errors/meal-not-found-error'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const meal = await mealsRepository.create({
      id: 'meal-id',
      name: 'meal-created',
      description: 'meal-descrition-created',
      created_at: new Date(),
      user_id: 'user-id',
      is_within_diet: true,
    })

    await sut.execute({
      mealId: meal.id,
      userId: meal.user_id,
    })

    expect(mealsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a meal with non-existent user', async () => {
    const meal = await mealsRepository.create({
      id: 'meal-id',
      name: 'meal-created',
      description: 'meal-descrition-created',
      created_at: new Date(),
      user_id: 'user-id',
      is_within_diet: true,
    })

    await expect(() =>
      sut.execute({
        mealId: meal.id,
        userId: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
