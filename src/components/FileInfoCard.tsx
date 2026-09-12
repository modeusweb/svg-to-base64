'use client'

import { IconFile } from './icons'

interface FileInfoCardProps {
  file: File
  onReset: () => void
}

export function FileInfoCard({ file, onReset }: FileInfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
            <IconFile className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white">
              {file.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  )
}