import 'dotenv/config'

import { execSync } from 'node:child_process'

import { Environment } from 'vitest'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = (process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
    '.db',
    `-${schema}.db`,
  ))

  return url
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = 'test-e2e'
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        execSync('npx prisma migrate reset --force')
      },
    }
  },
  transformMode: 'web',
}
