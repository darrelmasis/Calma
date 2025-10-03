// src/components/Countdown.jsx
import { useState, useEffect } from 'react'

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

const TimeBlock = ({ value, label }) => (
  <div className='d-flex flex-direction-column gap-1'>
    <span className='fs-display-1 p-3 bg-light-100 rounded-all-sm time-marker text-primary'>
      {value}
    </span>
    <div className='fs-lead text-muted'>{label}</div>
  </div>
)

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
    <div className='container'>
      <div className='w-100 d-flex flex-direction-column align-items-center justify-content-center min-vh-100 text-center p-4'>
        <div className='d-flex flex-direction-column flex-direction-md-row gap-2 justify-content-space-between align-items-center mb-4'>

          <div className='d-flex gap-2'>
            <TimeBlock value={days} label='días' />
            <TimeBlock
              value={hours.toString().padStart(2, '0')}
              label='horas'
            />
          </div>
          <div className='d-flex gap-2'>
            <TimeBlock
              value={minutes.toString().padStart(2, '0')}
              label='minutos'
            />
            <TimeBlock
              value={seconds.toString().padStart(2, '0')}
              label='segundos'
            />
          </div>

        </div>
        <p className='fs-lead text-muted'>
          Gracias por tu paciencia. Estamos preparando algo especial para ti.
        </p>
      </div>
    </div>
  )
}
