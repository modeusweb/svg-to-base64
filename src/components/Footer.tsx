import { IconGitHub } from './icons'

export function Footer() {
  return (
    <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <a
        href="https://github.com/modeusweb/svg-to-base64"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="View source on GitHub"
      >
        <IconGitHub className="w-6 h-6" />
      </a>
    </div>
  )
}