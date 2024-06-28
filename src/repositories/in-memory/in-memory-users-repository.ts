import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = await this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = await this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    await this.items.push(user)

    return user
  }
}
