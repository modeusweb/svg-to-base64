'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Copies text to the clipboard and tracks a temporary "copied" state
 * so buttons can show visual feedback. Returns whether the copy succeeded.
 *
 * The feedback timer is tracked in a ref and cleared on unmount, so a
 * pending timeout can never call setState on an unmounted component.
 */
export function useClipboard(resetDelayMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timeoutRef.current !== undefined) {
          window.clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = window.setTimeout(() => setCopied(false), resetDelayMs)
        return true
      } catch {
        return false
      }
    },
    [resetDelayMs],
  )

  return { copied, copy }
}