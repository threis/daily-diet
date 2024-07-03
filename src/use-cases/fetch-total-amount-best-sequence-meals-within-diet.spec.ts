import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'

import { FetchTotalAmountBestSequenceMealsWithinDietUseCase } from './fetch-total-amount-best-sequence-meals-within-diet'

let mealsRepository: InMemoryMealsRepository
let sut: FetchTotalAmountBestSequenceMealsWithinDietUseCase

describe('Fetch Total Amount Best Sequence Meals Within Diet Use Case', () => {
  beforeEach(async () => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchTotalAmountBestSequenceMealsWithinDietUseCase(
      mealsRepository,
    )
  })

  it('should be able to get total amount best sequence meals within diet by user id', async () => {
    let is_within_diet = true

    for (let i = 0; i < 10; i++) {
      if (i === 3 || i === 8) {
        is_within_diet = false
      } else {
        is_within_diet = true
      }

      await mealsRepository.create({
        name: `meal-created-${i}`,
        description: `meal-descrition-created-${i}`,
        created_at: new Date(),
        user_id: 'user-id-1',
        is_within_diet,
      })
    }

    const { totalAmountBestSequenceWithinDiet } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(totalAmountBestSequenceWithinDiet).toEqual(4)
  })
})
