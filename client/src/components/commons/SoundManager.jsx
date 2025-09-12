// SoundManager.js
import { Howl } from "howler";
import { useMemo, useRef, cloneElement, forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";

// 🎵 Catálogo de sonidos
export const sounds = {
  bell: ["/sounds/bell.mp3", "/sounds/bell.ogg"],
  openPops: ["/sounds/open-pops.ogg"],
  closePops: ["/sounds/close-pops.ogg"],
};

// ---------------------------
// Hook para reproducir sonidos manualmente
export const useSound = (sound = "bell", volume = 0.2) => {
  const soundInstance = useRef(null);

  if (!soundInstance.current && sounds[sound]) {
    soundInstance.current = new Howl({ src: sounds[sound], volume, preload: true });
  }

  const play = () => {
    if (soundInstance.current) {
      soundInstance.current.stop();
      soundInstance.current.play();
    }
  };

  return { play };
};

// ---------------------------
// Componente para triggers automáticos
export const SoundWrapper = forwardRef(
  ({ children, route, matchType = "except", sound = "bell", trigger = "click", volume = 0.2 }, ref) => {
    const location = useLocation();

    const soundInstance = useMemo(() => {
      if (!sounds[sound]) {
        console.warn(`⚠️ El sonido "${sound}" no existe.`);
        return null;
      }
      return new Howl({ src: sounds[sound], volume, preload: true });
    }, [sound, volume]);

    const playSound = () => {
      if (!soundInstance) return;
      const isMatch = location.pathname === route;
      if ((matchType === "only" && isMatch) || (matchType === "except" && !isMatch)) {
        soundInstance.stop();
        soundInstance.play();
      }
    };

    // 🔹 Exponer playSound vía ref
    useImperativeHandle(ref, () => ({ play: playSound }));

    // 🔹 Handlers según trigger
    let eventHandlers = {};
    if (trigger === "click") eventHandlers = { onClick: playSound};
    else if (trigger === "hover") eventHandlers = { onMouseEnter: playSound };
    else if (trigger === "focus") eventHandlers = { onFocus: playSound };

    const combineHandlers = (original, added) => (e) => {
      if (typeof original === "function") original(e);
      if (typeof added === "function") added(e);
    };

    const injectedProps = Object.keys(eventHandlers).reduce((acc, key) => {
      acc[key] = combineHandlers(children.props?.[key], eventHandlers[key]);
      return acc;
    }, {});

    return cloneElement(children, {
      ...injectedProps,
      style: { display: "flex", width: "100%", ...(children.props.style || {}) },
    });
  }
);
