// src/components/seo/SEO.jsx
import React, { useMemo } from 'react'
import { useHead } from '@unhead/react'
import { useLang } from '../../i18n/LanguageContext'
import { useLocation } from 'react-router-dom'

export function SEO({ title, description, keywords, image, noIndex = false }) {
  const { lang } = useLang()
  const location = useLocation()
  const baseUrl = import.meta.env.VITE_CALMA_URL || ''
  const appName = import.meta.env.VITE_CALMA_SHORT_NAME || 'Calma'
  const defaultDescription = import.meta.env.VITE_CALMA_DESCRIPTION || ''
  const defaultLang = import.meta.env.VITE_DEFAULT_LANG || 'es'

  const pathname = location.pathname

  // calcula hreflang alternativos
  const altEs = pathname.startsWith('/en')
    ? pathname.replace(/^\/en/, '/es')
    : pathname.startsWith('/es')
      ? pathname
      : `/es${pathname}`

  const altEn = pathname.startsWith('/es')
    ? pathname.replace(/^\/es/, '/en')
    : pathname.startsWith('/en')
      ? pathname
      : `/en${pathname}`

  const canonical = `${baseUrl}${pathname}`
  const imageUrl = image || `${baseUrl}/images/og/og-1200x630.png`

  // ✅ Configuración del head
  const headConfig = useMemo(() => {
    const config = {
      title: title ? `${title} | ${appName}` : appName,
      meta: [
        { name: 'description', content: description || defaultDescription },
        { name: 'keywords', content: keywords },
        { name: 'application-name', content: appName },

        // Open Graph
        { property: 'og:locale', content: defaultLang },
        { property: 'og:title', content: title || appName },
        {
          property: 'og:description',
          content: description || defaultDescription
        },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:alt', content: appName },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonical },
        { property: 'og:site_name', content: appName },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title || appName },
        {
          name: 'twitter:description',
          content: description || defaultDescription
        },
        { name: 'twitter:image', content: imageUrl }
      ],
      link: [
        { rel: 'canonical', href: canonical },
        { rel: 'alternate', hreflang: 'es', href: `${baseUrl}${altEs}` },
        { rel: 'alternate', hreflang: 'en', href: `${baseUrl}${altEn}` },
        { rel: 'alternate', hreflang: 'x-default', href: canonical }
      ],
      htmlAttrs: {
        lang
      }
    }

    // 👇 Condición para páginas "noindex"
    if (noIndex) {
      config.meta.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    return config
  }, [
    title,
    description,
    keywords,
    imageUrl,
    canonical,
    altEs,
    altEn,
    lang,
    noIndex,
    appName,
    defaultDescription,
    defaultLang,
    baseUrl,
    pathname
  ])

  useHead(headConfig)

  return null
}
