export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}