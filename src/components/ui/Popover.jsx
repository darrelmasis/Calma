// Popover.js
import React, { useState, useRef, createContext, useContext } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useTransitionStyles,
  useHover,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from "@floating-ui/react";

const PopoverContext = createContext(null);

export function Popover({ children, placement = "top-start", triggerMode = "click" }) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0, transform: "scale(0.95)" },
    open: { opacity: 1, transform: "scale(1)" },
    close: { opacity: 0, transform: "scale(0.95)" },
    common: ({ side }) => ({
      transformOrigin: {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
      }[side],
    }),
  });

  const hover = useHover(context, { enabled: triggerMode === "hover", delay: { open: 0, close: 200 } });
  const click = useClick(context, { enabled: triggerMode === "click" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const interactions = useInteractions([hover, click, dismiss, role]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, refs, interactions, isMounted, x, y, strategy, transitionStyles, context, arrowRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }) {
  const { refs, interactions, open } = useContext(PopoverContext);

  // Si children es función → recibe open
  if (typeof children === "function") {
    return children(open, {
      ref: refs.setReference,
      ...interactions.getReferenceProps(),
    });
  }

  // Si es un elemento → clonamos y le pasamos props
  return React.cloneElement(children, {
    ref: refs.setReference,
    ...interactions.getReferenceProps(),
  });
}

export function PopoverContent({ children, className }) {
  const { isMounted, refs, x, y, strategy, transitionStyles, interactions, context, arrowRef } =
    useContext(PopoverContext);

  if (!isMounted) return null;

  const popoverContentClasses = `popover-content ${className || ""}`;

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        className={popoverContentClasses}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          ...transitionStyles,
        }}
        {...interactions.getFloatingProps()}
      >
        <FloatingArrow
          ref={arrowRef}
          context={context}
          width={12}
          height={6}
          tipRadius={2}
          fill="white"
          stroke="#e8eaed"
          staticOffset={16}
          strokeWidth={0.6}
        />
        {children}
      </div>
    </FloatingPortal>
  );
}
