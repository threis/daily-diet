import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateUserUseCase } from './create-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    })

    expect(user.email).toEqual('johndoe@example.com')
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to create a user with an existing email', async () => {
    await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
