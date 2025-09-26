import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Icon } from './Icons'

export const HorizontalScroll = ({
  children,
  className,
  classNameContainer,
  activeIndex
}) => {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  // Drag state
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  // Actualiza los indicadores de scroll
  const updateIndicators = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 8)
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  // Centra el elemento activo
  const centerActive = () => {
    const el = scrollRef.current
    if (!el || activeIndex == null) return
    const child = el.children[activeIndex]
    if (!child) return

    const elCenter = el.clientWidth / 2
    const childCenter = child.offsetLeft + child.offsetWidth / 2
    el.scrollTo({
      left: childCenter - elCenter,
      behavior: 'smooth'
    })
  }

  // Drag handlers
  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollStart.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
    scrollRef.current.style.userSelect = 'none'
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX.current
    scrollRef.current.scrollLeft = scrollStart.current - walk
  }

  const stopDrag = () => {
    if (isDragging.current) {
      isDragging.current = false
      scrollRef.current.style.cursor = 'grab'
      scrollRef.current.style.removeProperty('user-select')
    }
  }

  useEffect(() => {
    updateIndicators()
    centerActive()

    const el = scrollRef.current
    if (!el) return

    // Scroll y resize
    el.addEventListener('scroll', updateIndicators)
    window.addEventListener('resize', updateIndicators)

    // Drag events
    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    el.addEventListener('mouseleave', stopDrag)

    return () => {
      el.removeEventListener('scroll', updateIndicators)
      window.removeEventListener('resize', updateIndicators)

      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      el.removeEventListener('mouseleave', stopDrag)
    }
  }, [activeIndex])

  return (
    <div className={classNames('horizontal-scroll d-flex align-items-center flex-1 justify-content-center', className)}>
      {showLeft && <div className='scroll-indicator left d-flex align-items-center'><Icon name='chevron-left' size='lg' className="text-primary" /></div>}
      {showRight && <div className='scroll-indicator right d-flex align-items-center'><Icon name='chevron-right' size='lg' className="text-primary" /></div>}

      <div
        className={classNames('scroll-container', classNameContainer)}
        ref={scrollRef}
        style={{ cursor: 'grab' }}
      >
        {children}
      </div>
    </div>
  )
}
