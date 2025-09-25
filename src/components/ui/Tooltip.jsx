import React, { useRef, useState } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
} from '@floating-ui/react'

export function Tooltip({ children, content, placement = 'top' }) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    refs,
    floatingStyles,
    context,
    middlewareData,
    strategy,
    placement: currentPlacement,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { move: false }),
  ])

  const ref = useMergeRefs([refs.setReference, children.ref])

  const side = currentPlacement.split('-')[0]
  const staticSide = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  }[side]

  return (
    <>
      {React.cloneElement(children, {
        ref,
        ...getReferenceProps(),
      })}

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className='tooltip'
            data-show={open}
            style={{
              ...floatingStyles,
              position: strategy,
              zIndex: 9999,
            }}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
