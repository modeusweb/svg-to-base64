import { useState, useCallback, type ChangeEvent, type DragEvent } from 'react'

type OutputFormat = 'base64' | 'css' | 'html'

function App() {
  const [svgFile, setSvgFile] = useState<File | null>(null)
  const [base64Result, setBase64Result] = useState('')
  const [base64Url, setBase64Url] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [walletCopied, setWalletCopied] = useState(false)
  const [previewScale, setPreviewScale] = useState(1)
  const [minify, setMinify] = useState(false)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('css')

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
    setPreviewScale(1)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      const base64 = typeof result === 'string' ? result : ''
      setBase64Url(base64)
      updateOutputFormat(base64, outputFormat, minify)
    }
    reader.onerror = () => {
      setError('Error reading file')
    }
    reader.readAsDataURL(file)
  }, [outputFormat, minify])

  const updateOutputFormat = useCallback((base64: string, format: OutputFormat, shouldMinify: boolean) => {
    let result = ''
    switch (format) {
      case 'base64':
        result = base64
        break
      case 'css':
        result = shouldMinify 
          ? `background-image:url(${base64});` 
          : `background-image: url(${base64});`
        break
      case 'html':
        result = shouldMinify
          ? `<img src="${base64}" alt="">`
          : `<img src="${base64}" alt="">`
        break
    }
    setBase64Result(result)
  }, [])

  const handleFormatChange = useCallback((format: OutputFormat) => {
    setOutputFormat(format)
    if (base64Url) {
      updateOutputFormat(base64Url, format, minify)
    }
  }, [base64Url, minify, updateOutputFormat])

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

  const downloadResult = useCallback(() => {
    if (!base64Result) return
    
    const blob = new Blob([base64Result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${svgFile?.name.replace('.svg', '')}-base64.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [base64Result, svgFile])

  const updateFormat = useCallback((newMinify: boolean) => {
    setMinify(newMinify)
    if (base64Url) {
      updateOutputFormat(base64Url, outputFormat, newMinify)
    }
  }, [base64Url, outputFormat, updateOutputFormat])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            SVG to Base64
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert SVG files to Base64, CSS, and HTML formats
          </p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Upload & Preview */}
          <div className="flex flex-col space-y-6">
            {/* Upload Area */}
            <div
              className={`flex items-center justify-center relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer flex-1 ${
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
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Preview Section */}
            {base64Url && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewScale(Math.max(0.25, previewScale - 0.25))}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                      title="Zoom out"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
                      {Math.round(previewScale * 100)}%
                    </span>
                    <button
                      onClick={() => setPreviewScale(Math.min(3, previewScale + 0.25))}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                      title="Zoom in"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full h-64 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                  <img 
                    src={base64Url} 
                    alt="SVG Preview" 
                    className="h-full max-w-full max-h-full object-contain transition-transform"
                    style={{ transform: `scale(${previewScale})` }}
                  />
                </div>
              </div>
            )}

            {/* File Info */}
            {svgFile && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
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
                        {svgFile.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {(svgFile.size / 1024).toFixed(2)} KB
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
            )}
          </div>

          {/* Right Column - Result & Settings */}
          <div className="flex flex-col space-y-6">
            {/* Format Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Format Settings
              </h3>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={minify}
                    onChange={(e) => updateFormat(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Minify CSS (remove spaces)
                  </span>
                </label>
              </div>
            </div>

            {/* Base64 Result */}
            {base64Result && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Output Format
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer text-sm ${
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
                    <button
                      onClick={downloadResult}
                      className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors flex items-center gap-2 cursor-pointer text-sm"
                      title="Download as file"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>

                {/* Format Tabs */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => handleFormatChange('base64')}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
                      outputFormat === 'base64'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Base64 String
                  </button>
                  <button
                    onClick={() => handleFormatChange('css')}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
                      outputFormat === 'css'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    CSS Background Image
                  </button>
                  <button
                    onClick={() => handleFormatChange('html')}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
                      outputFormat === 'html'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    HTML &lt;img&gt; code
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
            )}

            {/* SEO Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                What is an SVG to Base64 Converter?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                An SVG to base64 converter transforms Scalable Vector Graphics (SVG) files into
                base64-encoded data URIs that can be used in multiple formats. This tool supports
                three output types: raw Base64 strings, CSS background-image rules, and HTML img tags.
                This eliminates extra HTTP requests and lets you embed icons and images inline — ideal
                for icon systems, CSS sprites, and performance optimization.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4 text-sm">
                Simply drag and drop an SVG file into the upload area (or click to browse),
                and the converter instantly generates the ready-to-paste code in your chosen format
                with a live preview. Features include zoom control, format minification, and
                download options. Files up to 4MB are supported.
              </p>
            </div>
          </div>
        </div>

        {/* Donation Section - Full Width */}
        <div className="mt-8 max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-purple-100 dark:border-purple-900/40 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/40 rounded-full blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="text-4xl mb-3 animate-pulse">
                <span role="img" aria-label="heart">💜</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Enjoying this tool?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                This SVG converter is free and will always stay free. If it saved you
                some time, consider buying me a coffee — every little bit keeps
                this project running and improving. ☕
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                <code className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-300 font-mono select-all break-all">
                  TQZxZ2Ygh6RvkZDi5qswq8uF9KbDbDw9bo
                </code>
                <button
                  onClick={copyDonationAddress}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-xs cursor-pointer ${
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
              <p className="text-gray-500 dark:text-gray-400 text-xs">
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
  )
}

export default App
