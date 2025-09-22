// SoundManager.js
import { Howl } from "howler";

export const sounds = {
  bell: ["/sounds/bell.mp3", "/sounds/bell.ogg"],
  openPops: ["/sounds/open-pops.ogg"],
  closePops: ["/sounds/close-pops.ogg"],
  dropBag: ["/sounds/drop-bag.ogg"],
  trashBag: ["/sounds/trash-bag.ogg"],
  cleanShoppingBag: ["/sounds/clean-shopping-bag.ogg"],
};

// Instancias globales (singleton)
const soundInstances = {};

// Instancia global del último sonido que se reprodujo
let lastPlayedSound = null;

export const getSound = (sound, volume = 1) => {
  if (!sounds[sound]) {
    console.warn(`⚠️ El sonido "${sound}" no existe.`);
    return null;
  }

  if (!soundInstances[sound]) {
    soundInstances[sound] = new Howl({ src: sounds[sound], volume, preload: true });
  }

  return soundInstances[sound];
};

// Hook para reproducir sonidos
export const useSound = (sound = "bell") => {
  const play = () => {
    const instance = getSound(sound);
    if (!instance) return;

    // Detener el último sonido si existe
    if (lastPlayedSound && lastPlayedSound !== instance) {
      lastPlayedSound.stop();
    }

    lastPlayedSound = instance;
    instance.play();
  };

  return { play };
};
