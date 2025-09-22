import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useOfflineStatus } from "../../hooks/useOfflineStatus";

const OfflineIndicator = () => {
  const isOffline = useOfflineStatus();
  const [showOffline, setShowOffline] = useState(false);
  const [showOnline, setShowOnline] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const offlineRef = useRef(null);
  const onlineRef = useRef(null);

  useEffect(() => {
    if (isFirstLoad && !isOffline) {
      setIsFirstLoad(false);
      return;
    }

    if (isOffline) {
      setShowOnline(false);
      setShowOffline(true);
      document.body.classList.toggle('thinbar-open', isOffline)
    } else if (showOffline) {
      // Esperar a que offline desaparezca
      setShowOffline(false);
    } else {
      // Offline ya oculto, mostrar online
      setShowOnline(true);
      setTimeout(() => setShowOnline(false), 3000); // online 3s
    }
  }, [isOffline]);


  return (
    <>
      {/* Offline */}
      <CSSTransition
        in={showOffline}
        timeout={500}
        classNames="network-status-offline"
        unmountOnExit
        nodeRef={offlineRef}
        onExited={() => {
          if (!isOffline) {
            setShowOnline(true);
            setTimeout(() => {
              document.body.classList.remove('thinbar-open');
              setShowOnline(false);
            }, 2000);
          }
        }}
      >
        <div
          ref={offlineRef}
          className="network-status-offline bg-warning-100 text-center fw-semibold py-3"
        >
          <div className="d-flex align-items-center text-warning justify-content-center">
            ¡Houston, tenemos un problema!
          </div>
        </div>
      </CSSTransition>

      {/* Online */}
      <CSSTransition
        in={showOnline}
        timeout={500}
        classNames="network-status-online"
        unmountOnExit
        nodeRef={onlineRef}
        onExited={() => setIsFirstLoad(false)}
      >
        <div
          ref={onlineRef}
          className="network-status-online bg-success text-white text-center fw-semibold py-3"
        >
          <div className="d-flex align-items-center justify-content-center">
            <span className="online-check me-2">✓</span>
            ¡Estás de nuevo online! 🌐
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default OfflineIndicator;
