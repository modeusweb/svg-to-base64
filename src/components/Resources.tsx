export function Resources() {
  const links = [
    {
      category: 'SVG Documentation',
      items: [
        { name: 'MDN: SVG Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial' },
        { name: 'SVG Specification (W3C)', url: 'https://www.w3.org/TR/SVG2/' },
        { name: 'SVG on Can I Use', url: 'https://caniuse.com/svg' },
      ],
    },
    {
      category: 'Base64 Encoding',
      items: [
        { name: 'MDN: Base64 Encoding', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64' },
        { name: 'Data URIs Explained', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs' },
      ],
    },
    {
      category: 'Web Performance',
      items: [
        { name: 'Web.dev: Performance', url: 'https://web.dev/performance' },
        { name: 'Google PageSpeed Insights', url: 'https://pagespeed.web.dev/' },
        { name: 'WebPageTest', url: 'https://www.webpagetest.org/' },
      ],
    },
    {
      category: 'Developer Tools',
      items: [
        { name: 'SVG Optimizer (SVGO)', url: 'https://github.com/svg/svgo' },
        { name: 'SVGOMG (Online SVGO)', url: 'https://jakearchibald.github.io/svgomg/' },
        { name: 'CSS Tricks: SVG', url: 'https://css-tricks.com/lodge/svg/' },
      ],
    },
  ]

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Useful Resources for Web Developers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((section) => (
          <div key={section.category}>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}
