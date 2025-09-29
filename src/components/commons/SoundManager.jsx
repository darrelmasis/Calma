// SoundManager.js
import { Howl } from 'howler'
import toast from 'react-hot-toast'

export const sounds = {
  bell: ['/sounds/bell.ogg'],
  openPops: ['/sounds/open-pops.ogg'],
  closePops: ['/sounds/close-pops.ogg'],
  dropBag: ['/sounds/drop-bag.ogg'],
  trashBag: ['/sounds/trash-bag.ogg'],
  cleanShoppingBag: ['/sounds/clean-shopping-bag.ogg'],
  bagFull: ['/sounds/bag-full.ogg'],
  toastNotify: ['/sounds/toast-notify.ogg'],
  toastNotifyError: ['/sounds/toast-notify-error.ogg']
}

// Instancias globales (singleton)
const soundInstances = {}

// Instancia global del último sonido que se reprodujo
let lastPlayedSound = null

// Volumen predeterminado (ajusta según necesites)
const DEFAULT_VOLUME = 0.7

// Sistema de desbloqueo de audio
let audioUnlocked = false

const unlockAudio = () => {
  if (audioUnlocked) return

  // Intentar desbloquear con un sonido silencioso
  const unlockSound = new Howl({
    src: sounds.bell, // Usa un sonido que ya tienes
    volume: 0.01, // Volumen casi inaudible
    preload: true
  })

  try {
    const id = unlockSound.play()
    if (id) {
      unlockSound.on('play', () => {
        audioUnlocked = true
        unlockSound.stop(id)
      })
    }
  } catch (e) {
    console.log('Audio unlock attempt failed, will retry on next interaction')
  }
}

export const getSound = (sound, volume = DEFAULT_VOLUME) => {
  if (!sounds[sound]) {
    console.warn(`⚠️ El sonido "${sound}" no existe.`)
    return null
  }

  if (!soundInstances[sound]) {
    soundInstances[sound] = new Howl({
      src: sounds[sound],
      volume,
      preload: true,
      // Manejo de errores
      onloaderror: (id, error) => {
        console.error(`❌ Error cargando el sonido "${sound}":`, error)
      },
      onplayerror: (id, error) => {
        console.error(`❌ Error reproduciendo el sonido "${sound}":`, error)
        // Intentar reproducir nuevamente después de un breve retraso
        setTimeout(() => {
          if (soundInstances[sound]) {
            soundInstances[sound].play()
          }
        }, 100)
      }
    })
  } else {
    // 👇 Actualiza el volumen incluso si ya existe la instancia
    soundInstances[sound].volume(volume)
  }

  return soundInstances[sound]
}

// Hook actualizado
export const useSound = (sound = 'bell', volume = DEFAULT_VOLUME) => {
  const play = () => {
    // 👇 Desbloquear audio en cada interacción del usuario
    unlockAudio()

    const instance = getSound(sound, volume)
    if (!instance) return

    // Detener el último sonido si existe y es diferente
    if (lastPlayedSound && lastPlayedSound !== instance) {
      lastPlayedSound.stop()
    }

    // Si el mismo sonido ya está reproduciéndose, detenerlo para reiniciar
    if (instance.playing()) {
      instance.stop()
    }

    lastPlayedSound = instance
    instance.play()
  }

  return { play }
}
