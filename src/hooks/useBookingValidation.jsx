// hooks/useBookingValidation.js
import { useState, useCallback } from "react";

const VALIDATIONS = {
  name: (value, isStrict) => {
    if (!value?.trim()) return isStrict
      ? { state: "error", message: "Nombre obligatorio" }
      : { state: "normal" };
    if (value.trim().length < 2) return { state: "error", message: "Nombre muy corto" };
    return { state: "success" };
  },

  email: (value, isStrict) => {
    if (!value?.trim()) return isStrict
      ? { state: "error", message: "Correo obligatorio" }
      : { state: "normal" };
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return { state: "error", message: "Correo inválido" };
    return { state: "success" };
  },

  phone: (value, isStrict, formData = {}) => {
    if (!value?.trim()) return isStrict
      ? { state: "error", message: "Teléfono obligatorio" }
      : { state: "normal" };

    const digits = value.replace(/\D/g, "");
    const prefix = formData.prefix || "+505";

    if (prefix === "+1" && !/^\d{10}$/.test(digits))
      return { state: "error", message: "Número inválido en EE.UU." };
    if (prefix === "+505" && !/^\d{8}$/.test(digits))
      return { state: "error", message: "Número inválido en Nicaragua" };
    if (digits.length < 8 || digits.length > 15)
      return { state: "error", message: "Número inválido" };

    return { state: "success" };
  },

  date: (value, isStrict) => {
    if (!value) return isStrict
      ? { state: "error", message: "Fecha obligatoria" }
      : { state: "normal" };

    try {
      const selectedDate = new Date(value + 'T00:00:00');
      const today = new Date();

      const selectedDayStart = new Date(selectedDate);
      selectedDayStart.setHours(0, 0, 0, 0);

      const todayDayStart = new Date(today);
      todayDayStart.setHours(0, 0, 0, 0);

      return selectedDayStart >= todayDayStart
        ? { state: "success" }
        : { state: "error", message: "La fecha no puede ser en el pasado" };
    } catch (error) {
      return { state: "error", message: "Fecha inválida" };
    }
  },

  time: (value, isStrict, formData = {}) => {
    if (!value) return isStrict
      ? { state: "error", message: "Hora obligatoria" }
      : { state: "normal" };

    // Validar formato de hora (HH:MM)
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      return { state: "error", message: "Formato de hora inválido" };
    }

    // Si hay fecha seleccionada, validar que la hora no sea en el pasado
    if (formData.date) {
      try {
        const selectedDateTime = new Date(formData.date + 'T' + value);
        const now = new Date();

        // Si la fecha y hora seleccionada es anterior a ahora
        if (selectedDateTime < now) {
          return { state: "error", message: "La hora no puede ser en el pasado" };
        }

        // Validación adicional: no permitir citas con menos de 1 hora de anticipación
        const oneHourFromNow = new Date(now.getTime() + (60 * 60 * 1000)); // 1 hora desde ahora
        if (selectedDateTime < oneHourFromNow) {
          return { state: "error", message: "Se requiere al menos 1 hora de anticipación" };
        }

      } catch (error) {
        console.error('Error validando hora:', error);
        // Si hay error en la validación, continuar con validación básica
      }
    }

    // Validación básica de horario comercial (ejemplo: 8:00 AM - 6:00 PM)
    const [hours, minutes] = value.split(':').map(Number);
    if (hours < 8 || hours > 18) {
      return { state: "error", message: "Horario no disponible (8:00 AM - 6:00 PM)" };
    }

    return { state: "success" };
  }
};

const STEP_FIELDS = {
  1: ['name', 'email', 'phone'],
  2: ['date', 'time']
};

// Helper function para formatear hora
const formatTimeForDisplay = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const useBookingValidation = () => {
  const [fields, setFields] = useState({});

  const validateField = useCallback((fieldName, value, formData = {}) => {
    const validator = VALIDATIONS[fieldName];
    if (!validator) return { state: "normal" };

    const newFieldState = validator(value, false, formData);
    setFields(prev => ({ ...prev, [fieldName]: newFieldState }));
    return newFieldState;
  }, []);

  const validateStep = useCallback((stepIndex, formData) => {
    const fieldNames = STEP_FIELDS[stepIndex] || [];
    const newFields = {};

    fieldNames.forEach(fieldName => {
      const validator = VALIDATIONS[fieldName];
      if (validator) {
        newFields[fieldName] = validator(formData[fieldName], true, formData);
      }
    });

    setFields(newFields);
    return Object.values(newFields).every(f => f.state === "success");
  }, []);

  const getField = (field) => fields[field] || { state: "normal" };

  const clearField = useCallback((fieldName) => {
    setFields(prev => ({ ...prev, [fieldName]: { state: "normal" } }));
  }, []);

  return {
    fields,
    validateStep,
    validateField,
    getField,
    clearField
  };
};
