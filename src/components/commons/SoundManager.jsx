// SoundManager.js
import { Howl } from 'howler'

export const sounds = {
  addItem: ['/sounds/add-item.ogg'],
  removeItem: ['/sounds/remove-item.ogg'],
  clearItems: ['/sounds/clear-items.ogg'],
  openMenu: ['/sounds/open-menu.ogg'],
  closeMenu: ['/sounds/close-menu.ogg'],
  notifyInfo: ['/sounds/notify-info.ogg'],
  notifyError: ['/sounds/notify-error.ogg'],
  notifySuccess: ['/sounds/notify-success.ogg'],
  notifyWarning: ['/sounds/notify-warning.ogg'],
  operationComplete: ['/sounds/operation-completed.ogg']
}

// Instancias globales (singleton)
const soundInstances = {}

// Instancia global del último sonido que se reprodujo
let lastPlayedSound = null

// Volumen predeterminado (ajusta según necesites)
const DEFAULT_VOLUME = 0.5

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
export const useSound = (sound = 'notifyDefault', volume = DEFAULT_VOLUME) => {
  const play = () => {
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
