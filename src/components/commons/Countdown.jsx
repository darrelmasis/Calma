// src/components/Countdown.jsx
import { useState, useEffect } from 'react'
import styles from '../../styles/vendors/Countdown.module.scss'

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

export const Countdown = ({ targetDate, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    Math.max(targetDate - new Date(), 0)
  )

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish?.()
      return
    }
    const timer = setTimeout(() => {
      setTimeLeft(Math.max(targetDate - new Date(), 0))
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, targetDate, onFinish])

  const { days, hours, minutes, seconds } = formatTime(timeLeft)

  return (
    <div className={styles.countdownScreen}>
      <h1 className={styles.title}>La web estará disponible en:</h1>
      <div className={styles.countdownRow}>
        {days > 0 && (
          <div className={styles.timeBlock}>
            <span className={styles.timeNumber + ' ' + styles.days}>
              {days}
            </span>
            <div className={styles.timeLabel}>días</div>
          </div>
        )}
        <div className={styles.timeBlock}>
          <span className={styles.timeNumber}>
            {hours.toString().padStart(2, '0')}
          </span>
          <div className={styles.timeLabel}>horas</div>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.timeNumber}>
            {minutes.toString().padStart(2, '0')}
          </span>
          <div className={styles.timeLabel}>minutos</div>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.timeNumber}>
            {seconds.toString().padStart(2, '0')}
          </span>
          <div className={styles.timeLabel}>segundos</div>
        </div>
      </div>
      <div className={styles.message}>
        Gracias por tu paciencia. Estamos preparando algo especial para ti.
      </div>
    </div>
  )
}
