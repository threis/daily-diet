import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  save(data: Meal): Promise<Meal>
  findById(id: string): Promise<Meal | null>
}
