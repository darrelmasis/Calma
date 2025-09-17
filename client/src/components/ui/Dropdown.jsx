// Dropdown.jsx
import React, { createContext, useContext, useRef, useState, useMemo } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";

const DropdownContext = createContext(null);

export const Dropdown = ({ children, closeOnClickOutside = true }) => {
  const [open, setOpen] = useState(false);
  const [arrowEl, setArrowEl] = useState(null);

  const middleware = useMemo(
    () => [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowEl }),
    ],
    [arrowEl]
  );

  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePress: closeOnClickOutside });
  const role = useRole(context, { role: "listbox" });

  const interactions = useInteractions([click, dismiss, role]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 150,
    initial: { opacity: 0, transform: "scaleY(0.95)" },
    open: { opacity: 1, transform: "scaleY(1)" },
    close: { opacity: 0, transform: "scaleY(0.95)" },
    common: ({ side }) => ({
      transformOrigin: {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
      }[side],
    }),
  });

  const contextValue = {
    open,
    setOpen,
    toggle: () => setOpen(prev => !prev),
    close: () => setOpen(false),
    refs,
    context,
    interactions,
    x,
    y,
    strategy,
    isMounted,
    transitionStyles,
    setArrowEl,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div style={{ display: "inline-block", position: "relative" }}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger = ({ children }) => {
  const { refs, interactions } = useContext(DropdownContext);

  return (
    <div
      ref={refs.setReference}
      {...interactions.getReferenceProps()}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

export const DropdownContent = ({ children }) => {
  const {
    refs,
    interactions,
    strategy,
    x,
    y,
    isMounted,
    transitionStyles,
    context,
    setArrowEl,
  } = useContext(DropdownContext);

  if (!isMounted) return null;

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        {...interactions.getFloatingProps()}
        className="dropdown-content p-3 bg-neutral-0 border"
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          ...transitionStyles,
          willChange: "transform, opacity",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FloatingArrow
          ref={setArrowEl}
          context={context}
          width={12}
          height={6}
          tipRadius={2}
          fill="white"
          stroke="#e8eaed"
          strokeWidth={1}
        />
        {children}
      </div>
    </FloatingPortal>
  );
};
