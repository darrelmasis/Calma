import { openDB } from 'idb'

const DB_NAME = 'OutboxDB'
const STORE_NAME = 'outbox'

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

export async function addToOutbox(payload, type = 'default') {
  const db = await initDB()
  await db.add(STORE_NAME, { payload, type, timestamp: Date.now() })
}

export async function getOutbox() {
  const db = await initDB()
  return db.getAll(STORE_NAME)
}

export async function removeFromOutbox(id) {
  const db = await initDB()
  await db.delete(STORE_NAME, id)
}
