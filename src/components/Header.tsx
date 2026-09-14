export function Header() {
  return (
    <header className="text-center mb-8">
      <h1 className="mb-3">
        <span className="block text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-700 via-violet-500 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          BaseVector
        </span>
        <span className="block text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200 mt-3">
          Free SVG to Base64 Converter
        </span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Convert SVG files to Base64, CSS, and HTML formats
      </p>
    </header>
  )
}