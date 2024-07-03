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

  async getManyByUserId(userId: string) {
    const meals = await this.items.filter((meal) => meal.user_id === userId)

    return meals
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

  async save(meal: Meal) {
    const mealInIndex = this.items.findIndex((item) => item.id === meal.id)
    if (mealInIndex >= 0) {
      this.items[mealInIndex] = meal
    }

    return meal
  }

  async delete(id: string) {
    const index = this.items.findIndex((meal) => meal.id === id)
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  async countTotalAmount(userId: string) {
    const totalAmount = await this.items.filter(
      (meal) => meal.user_id === userId,
    ).length

    return totalAmount
  }

  async countTotalAmountWithinDiet(userId: string) {
    const totalAmount = await this.items.filter(
      (meal) => meal.user_id === userId && meal.is_within_diet,
    ).length

    return totalAmount
  }

  async countTotalAmountNonDietary(userId: string) {
    const totalAmount = await this.items.filter(
      (meal) => meal.user_id === userId && !meal.is_within_diet,
    ).length

    return totalAmount
  }

  async countBestSequenceWithinDiet(userId: string) {
    let sequenceCounter = 0
    let bestSequence = 0

    const meals = await this.items
      .filter((meal) => meal.user_id === userId)
      .sort((a, b) => (a.created_at > b.created_at ? 1 : -1))

    meals.forEach((meal) => {
      if (meal.is_within_diet) {
        sequenceCounter += 1
      } else {
        sequenceCounter = 0
      }

      if (sequenceCounter >= bestSequence) {
        bestSequence = sequenceCounter
      }
    })

    return bestSequence
  }
}
