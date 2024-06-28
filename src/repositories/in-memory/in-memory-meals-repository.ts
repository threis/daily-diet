import { randomUUID } from 'node:crypto'

import { Meal, Prisma } from '@prisma/client'

import { MealsRepository } from '../meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(id: string) {
    const meal = await this.items.find((meal) => meal.id === id)

    if (!meal) {
      return null
    }

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      is_within_diet: data.is_within_diet,
      created_at: new Date(),
      user_id: data.user_id,
    }

    await this.items.push(meal)

    return meal
  }
}
