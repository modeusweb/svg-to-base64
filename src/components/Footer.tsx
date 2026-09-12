import { IconGitHub } from './icons'

export function Footer() {
  return (
    <div className="py-8 text-center">
      <a
        href="https://github.com/modeusweb/svg-to-base64"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="View source on GitHub"
      >
        <IconGitHub className="w-5 h-5" />
        <span>View on GitHub</span>
      </a>
    </div>
  )
}