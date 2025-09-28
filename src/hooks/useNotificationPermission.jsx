// hooks/useNotificationPermission.js
import { useState, useCallback } from 'react';

export function useNotificationPermission() {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') {
      setPermission('unsupported');
      return 'unsupported';
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (e) {
      console.error("Error solicitando permiso de notificaciones:", e);
      setPermission('denied');
      return 'denied';
    }
  }, []);

  return {
    permission,
    requestPermission,
    isGranted: permission === 'granted',
    isDenied: permission === 'denied',
    isDefault: permission === 'default',
    isSupported: permission !== 'unsupported'
  };
}
