import { schema } from 'normalizr'

const key = new schema.Entity('keys')

export const gameSchema = new schema.Entity('games', { keys: [key] })

export const stashSchema = new schema.Array(gameSchema)
