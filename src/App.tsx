import { useState, useCallback, type ChangeEvent, type DragEvent } from 'react'

function App() {
  const [svgFile, setSvgFile] = useState<File | null>(null)
  const [base64Result, setBase64Result] = useState('')
  const [base64Url, setBase64Url] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [walletCopied, setWalletCopied] = useState(false)

  const handleFileSelect = useCallback((file: File) => {
    setError('')

    if (file.type !== 'image/svg+xml' && !file.name.endsWith('.svg')) {
      setError('Please select an SVG file')
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('File size exceeds 4MB limit')
      return
    }

    setSvgFile(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      const base64 = typeof result === 'string' ? result : ''
      const cssValue = `background-image: url(${base64});`
      setBase64Result(cssValue)
      setBase64Url(base64)
    }
    reader.onerror = () => {
      setError('Error reading file')
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    const file = files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(base64Result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Error copying to clipboard')
    }
  }, [base64Result])

  const resetConverter = useCallback(() => {
    setSvgFile(null)
    setBase64Result('')
    setBase64Url('')
    setError('')
    setCopied(false)
  }, [])

  const copyDonationAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('TQZxZ2Ygh6RvkZDi5qswq8uF9KbDbDw9bo')
      setWalletCopied(true)
      setTimeout(() => setWalletCopied(false), 2000)
    } catch (err) {
      setError('Error copying wallet address')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              SVG to Base64
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Convert SVG files to CSS background-image
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
              isDragging
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 scale-105'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-purple-400 hover:shadow-lg'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".svg,image/svg+xml"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="fileInput"
            />
            
            <div className="pointer-events-none">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-purple-500 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
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

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Result Section */}
          {base64Result && (
            <div className="mt-8 space-y-6">
              {/* File Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {svgFile?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {(svgFile ? svgFile.size / 1024 : 0).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetConverter}
                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Base64 Result */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    CSS Background Image
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                      copied 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                <div className="relative">
                  <pre 
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-700 dark:text-gray-300 font-mono cursor-pointer select-all"
                    tabIndex={0}
                  >
                    <code>{base64Result}</code>
                  </pre>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Preview
                </h3>
                <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                  {base64Url ? (
                    <img 
                      src={base64Url} 
                      alt="SVG Preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-400">Preview will appear here</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SEO Content */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              What is an SVG to Base64 Converter?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              An SVG to base64 converter transforms Scalable Vector Graphics (SVG) files into
              base64-encoded data URIs that can be used directly in CSS as{' '}
              <code className="text-purple-600 dark:text-purple-400">background-image</code>{' '}
              values. This eliminates extra HTTP requests and lets you embed icons and images
              inline in your stylesheets — ideal for icon systems, CSS sprites, and performance
              optimization.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              Simply drag and drop an SVG file into the upload area above (or click to browse),
              and the converter instantly generates the ready-to-paste{' '}
              <code className="text-purple-600 dark:text-purple-400">data:image/svg+xml;base64,...</code>{' '}
              CSS rule with a live preview. Files up to 4MB are supported, and one click copies the
              result to your clipboard.
            </p>
          </div>

          {/* Donation */}
          <div className="mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-purple-100 dark:border-purple-900/40 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/40 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="text-5xl mb-4 animate-pulse">
                  <span role="img" aria-label="heart">💜</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Enjoying this tool?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-6">
                  SVG to Base64 is free and will always stay free. If it saved you
                  some time, consider buying me a coffee — every little bit keeps
                  this project running and improving. ☕
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
                  <code className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 font-mono select-all break-all">
                    TQZxZ2Ygh6RvkZDi5qswq8uF9KbDbDw9bo
                  </code>
                  <button
                    onClick={copyDonationAddress}
                    className={`px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm cursor-pointer ${
                      walletCopied
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {walletCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Thank you with all my heart <span className="text-red-500" role="img" aria-label="heart">❤️</span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-4">Built with React + Vite + Tailwind CSS</p>
            <a
              href="https://github.com/modeusweb/svg-to-base64"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
