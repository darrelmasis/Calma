// useGlobalSound.js
import { Howl } from "howler";

let dropBagSound = null;
let trashBagSound = null;

export const useGlobalSound = () => {
  if (!dropBagSound) {
    dropBagSound = new Howl({ src: ["/sounds/dropBag.mp3"], volume: 0.3 });
  }
  if (!trashBagSound) {
    trashBagSound = new Howl({ src: ["/sounds/trashBag.mp3"], volume: 0.3 });
  }

  const playAdd = () => dropBagSound.play();
  const playRemove = () => trashBagSound.play();

  return { playAdd, playRemove };
};
