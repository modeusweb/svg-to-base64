interface FormatSettingsCardProps {
  minify: boolean
  onMinifyChange: (minify: boolean) => void
}

export function FormatSettingsCard({ minify, onMinifyChange }: FormatSettingsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Format Settings
      </h3>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={minify}
            onChange={(e) => onMinifyChange(e.target.checked)}
            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Minify SVG markup (one line, shorter base64)
          </span>
        </label>
      </div>
    </div>
  )
}