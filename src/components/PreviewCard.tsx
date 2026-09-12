'use client'

import { IconMinus, IconPlus } from './icons'

const MIN_SCALE = 0.25
const MAX_SCALE = 3
const SCALE_STEP = 0.25

interface PreviewCardProps {
  src: string
  scale: number
  onZoomChange: (scale: number) => void
}

export function PreviewCard({ src, scale, onZoomChange }: PreviewCardProps) {
  const zoomOut = () => onZoomChange(Math.max(MIN_SCALE, scale - SCALE_STEP))
  const zoomIn = () => onZoomChange(Math.min(MAX_SCALE, scale + SCALE_STEP))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Preview
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300 cursor-pointer"
            title="Zoom out"
          >
            <IconMinus />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300 cursor-pointer"
            title="Zoom in"
          >
            <IconPlus />
          </button>
        </div>
      </div>
      <div className="w-full h-64 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <img
          src={src}
          alt="Converted SVG preview - your uploaded file rendered as base64 encoded image"
          className="h-full max-w-full max-h-full object-contain transition-transform"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  )
}