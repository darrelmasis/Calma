// src/utils/countdown.js
// Fecha objetivo: 2 de noviembre de 2025, 18:00:00 hora local
export const COUNTDOWN_TARGET = new Date('2025-11-01T18:00:00')

export function getTimeLeft() {
  const now = new Date()
  const diff = COUNTDOWN_TARGET - now
  return diff > 0 ? diff : 0
}

export function hasCountdownFinished() {
  return getTimeLeft() === 0
}
