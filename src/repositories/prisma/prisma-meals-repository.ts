import { Meal, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { getBestSequenceMealsWithinDiet } from '@/utils/getBestSequenceMealsWithinDiet'

import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(mealId: string) {
    const meal = await prisma.meal.findUnique({
      where: { id: mealId },
    })

    return meal
  }

  async create(data: Prisma.MealUncheckedCreateInput) {
    const meal = await prisma.meal.create({ data })

    return meal
  }

  async save(data: Meal) {
    const meal = await prisma.meal.update({
      where: { id: data.id },
      data,
    })

    return meal
  }

  async delete(mealId: string) {
    await prisma.meal.delete({
      where: { id: mealId },
    })
  }

  async getManyByUserId(userId: string) {
    const meals = await prisma.meal.findMany({
      where: { user_id: userId },
    })

    return meals
  }

  async countTotalAmount(userId: string) {
    const totalAmount = await prisma.meal.count({
      where: { user_id: userId },
    })

    return totalAmount
  }

  async countTotalAmountWithinDiet(userId: string): Promise<number> {
    const totalAmount = await prisma.meal.count({
      where: {
        user_id: userId,
        is_within_diet: true,
      },
    })

    return totalAmount
  }

  async countTotalAmountNonDietary(userId: string): Promise<number> {
    const totalAmount = await prisma.meal.count({
      where: {
        user_id: userId,
        is_within_diet: false,
      },
    })

    return totalAmount
  }

  async countBestSequenceWithinDiet(userId: string): Promise<number> {
    const meals = await prisma.meal.findMany({
      where: { user_id: userId },
    })

    const bestSequence = getBestSequenceMealsWithinDiet(meals)

    return bestSequence
  }
}
