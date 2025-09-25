const Caret = ({ bgColor, strokeColor, size, ...props }) => {
  const backgroundColor = bgColor || '#ffffff'
  const borderColor = strokeColor || '#e8eaed'
  const borderWidth = 1
  const iconSize = size || 32

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      width={iconSize}
      height={iconSize}
      {...props}
    >
      <path
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={borderWidth}
        d='M8 20.8c-.645 0-1.23-.39-1.48-.99s-.11-1.285.35-1.74l8-8a1.6 1.6 0 0 1 2.265 0l8 8A1.601 1.601 0 0 1 24 20.8z'
      />
    </svg>
  )
}

export default Caret
