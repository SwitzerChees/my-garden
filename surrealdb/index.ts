import Surreal from 'surrealdb.js'
export const db = new Surreal('http://192.168.1.115:8000/rpc')

await db.signin({
  user: 'root',
  pass: 'root',
})
await db.use('mygarden', 'mygarden')

export * from './models'
