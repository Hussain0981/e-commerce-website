// Truncate text to a specific length
export function truncate(text, maxLength = 100) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
