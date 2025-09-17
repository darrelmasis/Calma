// SelectedServicesContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSound } from "../components/commons/SoundManager";

const LOCAL_STORAGE_KEY = "selectedServices";
const SelectedServicesContext = createContext();

export const SelectedServicesProvider = ({ children }) => {
  const addSound = useSound("dropBag");
  const removeSound = useSound("trashBag");
  const clearShoppingBagSound = useSound("cleanShoppingBag");

  const [services, setServices] = useState({});

  // Cargar del localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
    setServices(stored);
  }, []);

  // ➕ Agregar servicio con descripción
  const addService = (category, service, description) => {
    setServices((prev) => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = [];

      // Evita duplicados buscando por nombre
      const exists = updated[category].some((s) => s.name === service);
      if (!exists) {
        updated[category].push({ name: service, description });
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    addSound.play();
  };

  // ➖ Eliminar servicio por nombre
  const removeService = (category, service) => {
    setServices((prev) => {
      const updated = { ...prev };
      if (updated[category]) {
        updated[category] = updated[category].filter((s) => s.name !== service);
        if (updated[category].length === 0) delete updated[category];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
    removeSound.play();
  };

  // 🧹 Vaciar todos los servicios
  const clearServices = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setServices({});
    clearShoppingBagSound.play();
  };

  // 🔢 Total de servicios (sumando todos los arrays)
  const totalServices = Object.values(services).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <SelectedServicesContext.Provider
      value={{
        services,
        totalServices,
        addService,
        removeService,
        clearServices,
      }}
    >
      {children}
    </SelectedServicesContext.Provider>
  );
};

export const useSelectedServices = () => useContext(SelectedServicesContext);
