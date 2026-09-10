import type { OutputFormat } from '../types'
import { IconCopy, IconDownload } from './icons'

const FORMAT_TABS: ReadonlyArray<{ value: OutputFormat; label: string }> = [
  { value: 'base64', label: 'Base64 String' },
  { value: 'css', label: 'CSS Background Image' },
  { value: 'html', label: 'HTML <img> code' },
]

interface ResultCardProps {
  result: string
  outputFormat: OutputFormat
  copied: boolean
  onFormatChange: (format: OutputFormat) => void
  onCopy: () => void
  onDownload: () => void
}

export function ResultCard({
  result,
  outputFormat,
  copied,
  onFormatChange,
  onCopy,
  onDownload,
}: ResultCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Output Format
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer text-sm ${
              copied
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <IconCopy />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={onDownload}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors flex items-center gap-2 cursor-pointer text-sm"
            title="Download as file"
          >
            <IconDownload />
            Download
          </button>
        </div>
      </div>

      {/* Format Tabs */}
      <div className="flex gap-2 mb-4">
        {FORMAT_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onFormatChange(tab.value)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
              outputFormat === tab.value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <pre
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-700 dark:text-gray-300 font-mono cursor-pointer select-all"
          tabIndex={0}
        >
          <code>{result}</code>
        </pre>
      </div>
    </div>
  )
}