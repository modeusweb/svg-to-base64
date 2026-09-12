'use client'

import { useCallback, useState } from 'react'

/**
 * Copies text to the clipboard and tracks a temporary "copied" state
 * so buttons can show visual feedback. Returns whether the copy succeeded.
 */
export function useClipboard(resetDelayMs = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), resetDelayMs)
        return true
      } catch {
        return false
      }
    },
    [resetDelayMs],
  )

  return { copied, copy }
}