import { db } from '../utils/surrealdb'

export default defineEventHandler(async (event) => {
  event.context.db = db
})
