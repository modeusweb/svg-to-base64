import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://svg-to-base64.vercel.app'),
  title: {
    default: 'SVG to Base64 Converter — Free Online Tool',
    template: '%s | SVG to Base64 Converter',
  },
  description:
    'Free SVG to Base64 online converter. Drag and drop SVG files to get Base64 strings, CSS background-image, or HTML img code instantly. No sign-up needed.',
  keywords: [
    'SVG to base64',
    'SVG converter',
    'base64 encoder',
    'SVG to CSS',
    'SVG to HTML',
    'data URI',
    'data:image/svg+xml',
    'web development tools',
    'image converter',
    'free SVG tool',
  ],
  authors: [{ name: 'modeusweb', url: 'https://github.com/modeusweb' }],
  creator: 'modeusweb',
  publisher: 'modeusweb',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://svg-to-base64.vercel.app/',
  },
  openGraph: {
    type: 'website',
    siteName: 'SVG to Base64 Converter',
    url: 'https://svg-to-base64.vercel.app/',
    title: 'SVG to Base64 Converter — Free Online Tool',
    description:
      'Convert SVG files to Base64 strings, CSS background-image, or HTML img code. Drag and drop, get ready-to-use code in multiple formats, copy with one click.',
    images: [
      {
        url: 'https://svg-to-base64.vercel.app/og-image.png',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'SVG to Base64 Converter — Free Online Tool',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@modeusweb',
    creator: '@modeusweb',
    title: 'SVG to Base64 Converter — Free Online Tool',
    description:
      'Convert SVG files to Base64 strings, CSS background-image, or HTML img code. Free, fast, no sign-up.',
    images: [
      {
        url: 'https://svg-to-base64.vercel.app/og-image.png',
        alt: 'SVG to Base64 Converter — Free Online Tool',
      },
    ],
  },
  category: 'technology',
  classification: 'Developer Tools',
  applicationName: 'SVG to Base64 Converter',
}

export const viewport: Viewport = {
  themeColor: '#863bff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-title" content="SVG to Base64" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'SVG to Base64 Converter',
              url: 'https://svg-to-base64.vercel.app/',
              description:
                'Free online converter that turns SVG files into base64-encoded data URIs, CSS background-image rules, and HTML img code.',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript',
              softwareVersion: '2.0.0',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Person',
                name: 'modeusweb',
                url: 'https://github.com/modeusweb',
              },
              publisher: {
                '@type': 'Organization',
                name: 'modeusweb',
                url: 'https://github.com/modeusweb',
              },
              featureList: [
                'Drag & drop SVG upload',
                'Base64 encoding',
                'CSS background-image output',
                'HTML img tag output',
                'Live preview with zoom',
                'SVG minification',
                'Copy to clipboard',
                'Download result',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
