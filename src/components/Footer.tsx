import { IconGitHub } from './icons'

export function Footer() {
  return (
    <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
      <p className="mb-4">Built with React + Vite + Tailwind CSS</p>
      <a
        href="https://github.com/modeusweb/svg-to-base64"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="View source on GitHub"
      >
        <IconGitHub className="w-7 h-7" />
      </a>
    </div>
  )
}