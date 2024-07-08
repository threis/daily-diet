import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { CreateUserUseCase } from '../create-user'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
