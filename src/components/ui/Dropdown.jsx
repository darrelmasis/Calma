// Dropdown.jsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo
} from 'react'
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
  arrow
} from '@floating-ui/react'
import { useDevice } from '../../hooks/useBreakpoint'
import classNames from 'classnames'

export const DropdownContext = createContext(null)

export const Dropdown = ({
  children,
  closeOnClickOutside = true,
  position,
  offsetX
}) => {
  const [open, setOpen] = useState(false)
  const [arrowEl, setArrowEl] = useState(null)
  const { type } = useDevice()

  const isTablet = type === 'tablet'
  const isDesktop = type === 'desktop'

  const dropdownPosition =
    isDesktop || isTablet
      ? position || 'bottom-end'
      : position || 'bottom-center'

  const middleware = useMemo(
    () => [
      offset({ mainAxis: 8, crossAxis: offsetX }),
      flip(),
      shift({ padding: 0 }),
      arrow({ element: arrowEl })
    ],
    [arrowEl]
  )

  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: dropdownPosition,
    middleware,
    whileElementsMounted: autoUpdate
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, { outsidePress: closeOnClickOutside })
  const role = useRole(context, { role: 'listbox' })

  const interactions = useInteractions([click, dismiss, role])

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 100,
    initial: { opacity: 0, transform: 'scaleY(0.95)' },
    open: { opacity: 1, transform: 'scaleY(1)' },
    close: { opacity: 0, transform: 'scaleY(0.95)' },
    common: ({ side }) => ({
      transformOrigin: {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }[side]
    })
  })

  const contextValue = {
    open,
    setOpen,
    toggle: () => setOpen((prev) => !prev),
    close: () => setOpen(false),
    refs,
    context,
    interactions,
    x,
    y,
    strategy,
    isMounted,
    transitionStyles,
    setArrowEl
  }

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  )
}

export const DropdownTrigger = ({ children, className }) => {
  const { refs, interactions, open } = useContext(DropdownContext)

  const triggerClasses = classNames(
    'dropdown-trigger',
    { open: open },
    className
  )
  return (
    <div
      className={triggerClasses}
      ref={refs.setReference}
      {...interactions.getReferenceProps()}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}

export const DropdownContent = ({ children, className }) => {
  const {
    refs,
    interactions,
    strategy,
    x,
    y,
    isMounted,
    transitionStyles,
    context,
    setArrowEl
  } = useContext(DropdownContext)

  if (!isMounted) return null

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        {...interactions.getFloatingProps()}
        className={`dropdown-content bg-neutral-0 border rounded-all-md ${className || ''}`}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          ...transitionStyles,
          willChange: 'transform, opacity',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <FloatingArrow
          ref={setArrowEl}
          context={context}
          width={16}
          height={8}
          tipRadius={2}
          fill='white'
          stroke='#e8eaed'
          strokeWidth={1}
        />
        {children}
      </div>
    </FloatingPortal>
  )
}


export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('useDropdown debe usarse dentro de un componente <Dropdown>')
  }
  return context
}
