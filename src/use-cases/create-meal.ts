import { Meal } from '@prisma/client'

import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { UserNotFoundError } from './errors/user-not-found-error'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  isWithinDiet: boolean
  userId: string
}
interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    description,
    isWithinDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const meal = await this.mealsRepository.create({
      name,
      description,
      is_within_diet: isWithinDiet,
      user_id: user.id,
    })

    return {
      meal,
    }
  }
}
