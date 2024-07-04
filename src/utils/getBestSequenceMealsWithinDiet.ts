import { Meal } from '@prisma/client'

export function getBestSequenceMealsWithinDiet(meals: Meal[]): number {
  let sequenceCounter = 0
  let bestSequence = 0

  meals.sort((a, b) => (a.created_at > b.created_at ? 1 : -1))

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
