'use client'

interface SocialSharingProps {
  url: string
  title: string
  description: string
}

export function SocialSharing({ url, title, description }: SocialSharingProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const socialLinks = [
    {
      name: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Reddit',
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm6.669 10.13c.074-.39.111-.79.111-1.19 0-.4-.037-.8-.111-1.19a3.19 3.19 0 0 0-1.94-2.26 3.19 3.19 0 0 0-2.92.18 9.86 9.86 0 0 0-5.44 0 3.19 3.19 0 0 0-2.92-.18 3.19 3.19 0 0 0-1.94 2.26c-.074.39-.111.79-.111 1.19 0 .4.037.8.111 1.19a3.19 3.19 0 0 0 1.94 2.26c.3.12.61.18.92.18.66 0 1.31-.27 1.8-.78a5.93 5.93 0 0 1 3.64-1.31c.66 0 1.31.12 1.94.36.3.12.61.18.92.18.31 0 .62-.06.92-.18a3.19 3.19 0 0 0 1.94-2.26zM10.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.36 3.44a.75.75 0 1 0-1.06 1.06c.61.61 1.84.61 2.45 0a.75.75 0 1 0-1.06-1.06c-.04.04-.17.04-.21 0l-.12.12zm-2.56.44c-.61-.61-1.84-.61-2.45 0a.75.75 0 1 1-1.06-1.06c1.19-1.19 3.38-1.19 4.57 0a.75.75 0 0 1-1.06 1.06z" clipRule="evenodd" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Share this free online tool
      </h3>
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300 text-sm"
            aria-label={`Share on ${social.name}`}
          >
            {social.icon}
            {social.name}
          </a>
        ))}
      </div>
    </div>
  )
}
