import { useEffect } from 'react'

export function useDynamicFavicon(condition) {
  useEffect(() => {
    if (condition) {
      setFavicon('/favicon-alt.ico')
    } else {
      setFavicon('/favicon.ico')
    }
  }, [condition])
}

function setFavicon(iconUrl) {
  let link = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = iconUrl
}
