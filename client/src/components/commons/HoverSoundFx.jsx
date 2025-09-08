import { Howl } from "howler";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const HoverSoundWrapper = ({ children, route, matchType = "except" }) => {
  const location = useLocation();

  // Creamos el sonido una sola vez
  const hoverSound = useMemo(
    () =>
      new Howl({
        src: ["/sounds/bell.mp3", "/sounds/bell.ogg",],
        volume: 0.2,
         preload: true, // fuerza carga
      }),
    []
  );

  const playSound = () => {
    const isMatch = location.pathname === route;

    if (
      (matchType === "only" && isMatch) || // reproducir solo en la ruta específica
      (matchType === "except" && !isMatch) // reproducir en todas menos esa ruta
    ) {
      hoverSound.stop();
      hoverSound.play();
    }
  };

  return (
    <div onMouseDown={playSound} style={{ display: "flex", width: "100%" }}>
      {children}
    </div>
  );
};

export { HoverSoundWrapper };
