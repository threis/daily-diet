import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { GetMealUseCase } from './get-meal'

let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Get Meal Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(mealsRepository)
  })

  it('should be able to get meal by id', async () => {
    const meal = await mealsRepository.create({
      name: 'meal-created',
      description: 'meal-descrition-created',
      created_at: new Date(),
      user_id: 'user-id',
      is_within_diet: true,
    })

    const { meal: findedMeal } = await sut.execute({
      id: meal.id,
    })

    expect(findedMeal.name).toEqual('meal-created')
  })
})
