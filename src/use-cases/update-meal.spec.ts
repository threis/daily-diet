import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { UpdateMealUseCase } from './update-meal'

let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Update Meal Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should be able to update a new meal', async () => {
    const meal = await mealsRepository.create({
      id: 'meal-id',
      name: 'meal-created',
      description: 'meal-descrition-created',
      created_at: new Date(),
      user_id: 'user-id',
      is_within_diet: true,
    })

    const { meal: mealUpdated } = await sut.execute({
      name: 'meal-updated',
      description: 'meal-description-updated',
      userId: meal.user_id,
      isWithinDiet: false,
      mealId: meal.id,
    })

    expect(mealUpdated.name).toEqual('meal-updated')
    expect(mealUpdated.description).toEqual('meal-description-updated')
    expect(mealUpdated.is_within_diet).toBe(false)
  })
})
