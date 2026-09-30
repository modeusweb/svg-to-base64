'use client'

import { useCallback, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'
import { IconUpload } from './icons'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) onFileSelect(file)
    },
    [onFileSelect],
  )

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      // Reset the input so re-picking the same file fires change again.
      e.target.value = ''
      if (file) onFileSelect(file)
    },
    [onFileSelect],
  )

  // The native input is visually hidden and opened programmatically, so it never
  // takes focus: a focusable element inside an aria-hidden tree (or inside the
  // role="button" wrapper) would break assistive technology.
  const openFileDialog = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Enter' && e.key !== ' ') return
      e.preventDefault()
      openFileDialog()
    },
    [openFileDialog],
  )

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload SVG file: drag and drop, or press Enter to browse"
      className={`flex items-center justify-center relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${
        isDragging
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 scale-105'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-purple-400 hover:shadow-lg'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onClick={openFileDialog}
    >
      {/* Kept in the DOM but out of the a11y tree and out of the tab order; the
          wrapper above is the accessible control and triggers it on click/keyboard. */}
      <input
        ref={inputRef}
        type="file"
        accept=".svg,image/svg+xml"
        onChange={handleFileInputChange}
        onClick={(e) => e.stopPropagation()}
        className="hidden"
        id="fileInput"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="pointer-events-none">
        <div className="mb-4">
          <IconUpload className="w-16 h-16 mx-auto text-purple-500 dark:text-purple-400" />
        </div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
          {isDragging ? 'Drop file here' : 'Drag SVG file here'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          or click to select file
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Maximum file size: 4MB
        </p>
      </div>
    </div>
  )
}