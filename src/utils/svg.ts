import type { OutputFormat } from '../types'

const ENCODER_ATTR_RE = /\s(sodipodi|inkscape|sketch|figma|xmlns:(?:sodipodi|inkscape|sketch|figma|serif|dc|cc|rdf))[^\s=]*(?:="[^"]*"|='[^']*')?/g

/**
 * Safely minifies SVG markup to a single line without breaking the icon.
 * - removes XML declaration, doctype and comments
 * - removes editor metadata (Inkscape, Sketch, Figma, Sodipodi)
 * - removes <metadata> elements and empty groups
 * - collapses whitespace between tags and trims attribute values
 * - never touches tag names, attributes semantics or path data content
 */
export function minifySvg(svg: string): string {
  let result = svg

  // Remove XML declaration and DOCTYPE
  result = result.replace(/<\?xml[\s\S]*?\?>/gi, '')
  result = result.replace(/<!DOCTYPE[\s\S]*?(?:>|\[[\s\S]*?\]>)/gi, '')
  // Remove comments
  result = result.replace(/<!--[\s\S]*?-->/g, '')

  // Remove editor-specific attributes (namespace declarations included)
  result = result.replace(ENCODER_ATTR_RE, ' ')

  // Remove <metadata>...</metadata> blocks (safe, non-rendering)
  result = result.replace(/<metadata[\s\S]*?<\/metadata\s*>/gi, '')

  // Remove empty groups: <g ...></g> or <g .../>
  for (let i = 0; i < 5; i++) {
    const before = result
    result = result.replace(/<g(?:\s[^>]*)?>\s*<\/g\s*>/gi, '')
    result = result.replace(/<g(?:\s[^>]*)?\/>/gi, '')
    if (result === before) break
  }

  // Collapse whitespace between tags, then all remaining whitespace runs
  result = result.replace(/>\s+</g, '><')
  result = result.replace(/\s{2,}/g, ' ')

  // Trim whitespace inside attribute values (e.g. d=" M10 10 ..." )
  result = result.replace(/=\s*("(\s*[^"]*\s*)"|'(\s*[^']*\s*)')/g, (_m, _q, dq, sq) => {
    const value = (dq !== undefined ? dq : sq).trim()
    return `="${value}"`
  })

  return result.trim()
}

/**
 * Encodes SVG markup into a base64 data URI.
 * Works with the UTF-8 string directly so unicode markup survives
 * and large files do not blow the stack.
 */
export function svgToBase64(svg: string): string {
  const bytes = new TextEncoder().encode(svg)
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return `data:image/svg+xml;base64,${btoa(binary)}`
}

/**
 * Wraps a base64-encoded SVG data URI into the requested output format.
 */
export function formatSvgOutput(base64Url: string, format: OutputFormat): string {
  switch (format) {
    case 'base64':
      return base64Url
    case 'css':
      return `background-image: url(${base64Url});`
    case 'html':
      return `<img src="${base64Url}" alt="">`
  }
}