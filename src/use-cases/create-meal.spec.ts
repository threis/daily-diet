import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateMealUseCase } from './create-meal'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository, usersRepository)
  })

  it('should be able to create a new meal', async () => {
    const user = await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: 'password-hash',
    })

    const { meal } = await sut.execute({
      name: 'name-test',
      description: 'description-test',
      userId: user.id,
      isWithinDiet: true,
    })

    expect(meal.name).toEqual('name-test')
  })
})
