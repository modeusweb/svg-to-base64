import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://svg-to-base64.vercel.app'),
  title: 'SVG to Base64 Converter — Multiple Formats Free Online Tool',
  description:
    'Free SVG to Base64 online converter: drag and drop an SVG file and instantly get Base64 strings, CSS background-image, or HTML img code with live preview. No sign-up needed.',
  keywords: [
    'SVG',
    'base64',
    'converter',
    'CSS',
    'background-image',
    'HTML img',
    'data URI',
    'data:image/svg+xml',
    'web development',
    'image converter',
  ],
  authors: [{ name: 'modeusweb' }],
  creator: 'modeusweb',
  publisher: 'modeusweb',
  robots: 'index, follow, max-image-preview: large',
  alternates: {
    canonical: 'https://svg-to-base64.vercel.app/',
  },
  openGraph: {
    type: 'website',
    siteName: 'SVG to Base64 Converter',
    url: 'https://svg-to-base64.vercel.app/',
    title: 'SVG to Base64 Converter — Multiple Formats Free Online Tool',
    description:
      'Convert SVG files to Base64 strings, CSS background-image, or HTML img code. Drag and drop, get ready-to-use code in multiple formats, copy with one click.',
    images: [
      {
        url: 'https://svg-to-base64.vercel.app/og-image.png',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVG to Base64 Converter',
    description:
      'Convert SVG files to Base64 strings, CSS background-image, or HTML img code. Free, fast, no sign-up.',
    images: ['https://svg-to-base64.vercel.app/og-image.png'],
  },
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
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              publisher: {
                '@type': 'Organization',
                name: 'modeusweb',
                url: 'https://github.com/modeusweb',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
