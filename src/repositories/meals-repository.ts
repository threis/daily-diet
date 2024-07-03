import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(mealId: string): Promise<Meal | null>
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(data: Meal): Promise<Meal>
  delete(mealId: string): Promise<void>
  getManyByUserId(userId: string): Promise<Meal[]>
  countTotalAmount(userId: string): Promise<number>
}
