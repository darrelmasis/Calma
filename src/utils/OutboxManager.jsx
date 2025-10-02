// src/utils/outboxManager.js
import { openDB } from 'idb'

const DB_NAME = 'OutboxDB'
const DB_VERSION = 2
const STORE_NAME = 'outbox'

/**
 * Stable stringify: ordena keys para comparar payloads independientemente del orden original.
 */
function stableStringify(obj) {
  if (obj === null) return 'null'
  if (typeof obj !== 'object') return JSON.stringify(obj)
  if (Array.isArray(obj)) return '[' + obj.map(stableStringify).join(',') + ']'

  const keys = Object.keys(obj).sort()
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(obj[k])).join(',') + '}'
}

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
        // index opcional para búsquedas más rápidas
        try {
          store.createIndex('type', 'type', { unique: false })
          store.createIndex('signature', 'signature', { unique: false })
        } catch (err) {
          // si falla crear índices, no bloquea la app
          console.warn('Could not create indexes on outbox store', err)
        }
      } else {
        // si la store ya existía, intentamos asegurar que el índice signature exista (upgrade path)
        try {
          const store = transaction.objectStore(STORE_NAME)
          if (!store.indexNames.contains('signature')) {
            store.createIndex('signature', 'signature', { unique: false })
          }
        } catch (err) {
          // ignore
        }
      }
    }
  })
}

/**
 * Añade al outbox evitando duplicados exactos del payload+type.
 * Devuelve true si se añadió, false si se omitió por duplicado.
 */
export async function addToOutbox(payload, type = 'default') {
  const db = await initDB()
  const signature = stableStringify(payload)

  // buscar duplicados
  const all = await db.getAll(STORE_NAME)
  const exists = all.some((item) => item.type === type && item.signature === signature)

  if (exists) {
    console.warn('Outbox: duplicate payload detected — skipping add.')
    return false
  }

  await db.add(STORE_NAME, { payload, type, timestamp: Date.now(), signature })
  return true
}

export async function getOutbox() {
  const db = await initDB()
  return db.getAll(STORE_NAME)
}

export async function removeFromOutbox(id) {
  const db = await initDB()
  await db.delete(STORE_NAME, id)
}
