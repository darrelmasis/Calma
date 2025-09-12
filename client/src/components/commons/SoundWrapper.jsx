import { Howl } from "howler";
import { useMemo, cloneElement } from "react";
import { useLocation } from "react-router-dom";

const sounds = {
  bell: ["/sounds/bell.mp3", "/sounds/bell.ogg"],
  openPops: ["/sounds/open-pops.ogg"],
  closePops: ["/sounds/close-pops.ogg"],
};

const combineHandlers = (originalHandler, newHandler) => (e) => {
  if (typeof originalHandler === "function") originalHandler(e);
  if (typeof newHandler === "function") newHandler(e);
};

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const SoundWrapper = ({
  children,
  route,
  matchType = "except",
  sound = "bell",
  trigger = "click",
  volume = 0.2,
}) => {
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

  // 🔹 Asignamos el evento correcto según dispositivo
  let eventHandlers = {};
  if (trigger === "click") {
    eventHandlers = isTouchDevice()
      ? { onTouchStart: playSound }
      : { onClick: playSound };
  } else if (trigger === "hover") {
    eventHandlers = { onMouseEnter: playSound };
  } else if (trigger === "focus") {
    eventHandlers = { onFocus: playSound };
  }

  // 🚀 Combinar handlers existentes del hijo
  const injectedProps = Object.keys(eventHandlers).reduce((acc, key) => {
    acc[key] = combineHandlers(children.props?.[key], eventHandlers[key]);
    return acc;
  }, {});

  return cloneElement(children, {
    ...injectedProps,
    style: { display: "flex", width: "100%", ...(children.props.style || {}) },
  });
};

export { SoundWrapper };
