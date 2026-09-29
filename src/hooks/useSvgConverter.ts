'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { OutputFormat } from '../types'
import { formatSvgOutput, isSvgMarkup, minifySvg, svgToBase64 } from '../utils/svg'

export const MAX_SVG_FILE_SIZE = 4 * 1024 * 1024

const SVG_MIME_TYPE = 'image/svg+xml'

function hasSvgExtension(name: string): boolean {
  return name.toLowerCase().endsWith('.svg')
}

/**
 * Owns all SVG conversion state and business logic:
 * file validation/reading, minification, base64 encoding,
 * output formatting, download and reset.
 */
export function useSvgConverter() {
  const [svgFile, setSvgFile] = useState<File | null>(null)
  const [svgText, setSvgText] = useState('')
  const [base64Url, setBase64Url] = useState('')
  const [base64Result, setBase64Result] = useState('')
  const [error, setError] = useState('')
  const [previewScale, setPreviewScale] = useState(1)
  const [minifySvgMarkup, setMinifySvgMarkup] = useState(true)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('css')

  // Kept in a ref so in-flight reads can be aborted on unmount/reset,
  // preventing a late FileReader callback from restoring stale state.
  const readerRef = useRef<FileReader | null>(null)

  useEffect(() => {
    return () => {
      readerRef.current?.abort()
      readerRef.current = null
    }
  }, [])

  const cancelPendingRead = useCallback(() => {
    readerRef.current?.abort()
    readerRef.current = null
  }, [])

  const updateResult = useCallback((url: string, format: OutputFormat) => {
    setBase64Result(formatSvgOutput(url, format))
  }, [])

  const encodeSvg = useCallback(
    (text: string, shouldMinifyMarkup: boolean) => {
      const source = shouldMinifyMarkup ? minifySvg(text) : text
      const url = svgToBase64(source)
      setBase64Url(url)
      updateResult(url, outputFormat)
    },
    [outputFormat, updateResult],
  )

  const handleFileSelect = useCallback(
    (file: File) => {
      setError('')

      // Browsers report an empty type for some SVG files, so the extension is
      // accepted as well. Content is verified after reading.
      if (file.type !== SVG_MIME_TYPE && !hasSvgExtension(file.name)) {
        setError('Please select an SVG file')
        return
      }

      if (file.size > MAX_SVG_FILE_SIZE) {
        setError('File size exceeds 4MB limit')
        return
      }

      setSvgFile(file)
      setPreviewScale(1)

      cancelPendingRead()

      const reader = new FileReader()
      readerRef.current = reader

      reader.onload = (e) => {
        if (readerRef.current !== reader) return

        const result = e.target?.result
        if (typeof result !== 'string') {
          setError('Error reading file')
          return
        }
        if (!isSvgMarkup(result)) {
          setError('This file does not contain valid SVG markup')
          setSvgFile(null)
          return
        }
        setSvgText(result)
        encodeSvg(result, minifySvgMarkup)
      }
      reader.onerror = () => {
        if (readerRef.current !== reader) return
        setError('Error reading file')
      }
      reader.readAsText(file, 'utf-8')
    },
    [cancelPendingRead, encodeSvg, minifySvgMarkup],
  )

  const handleFormatChange = useCallback(
    (format: OutputFormat) => {
      setOutputFormat(format)
      if (base64Url) {
        updateResult(base64Url, format)
      }
    },
    [base64Url, updateResult],
  )

  const updateSvgMarkupMinify = useCallback(
    (minify: boolean) => {
      setMinifySvgMarkup(minify)
      if (svgText) {
        encodeSvg(svgText, minify)
      }
    },
    [svgText, encodeSvg],
  )

  const resetConverter = useCallback(() => {
    cancelPendingRead()
    setSvgFile(null)
    setSvgText('')
    setBase64Url('')
    setBase64Result('')
    setError('')
    setPreviewScale(1)
  }, [cancelPendingRead])

  const downloadResult = useCallback(() => {
    if (!base64Result) return

    const blob = new Blob([base64Result], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const baseName = svgFile?.name.replace(/\.svg$/i, '') || 'svg'
    a.href = url
    a.download = `${baseName}-base64.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [base64Result, svgFile])

  return {
    svgFile,
    base64Url,
    base64Result,
    error,
    previewScale,
    minifySvgMarkup,
    outputFormat,
    setPreviewScale,
    setError,
    handleFileSelect,
    handleFormatChange,
    updateSvgMarkupMinify,
    resetConverter,
    downloadResult,
  }
}