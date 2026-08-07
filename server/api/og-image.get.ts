export default defineEventHandler((event) => {
  const query = getQuery(event)
  const title = (query.title as string) || 'LearnStack'
  const description = (query.description as string) || 'Step-by-step tutorials & in-depth blog posts'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F172A"/>
      <stop offset="100%" style="stop-color:#1E3A5F"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0284C7"/>
      <stop offset="100%" style="stop-color:#38BDF8"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Accent bar -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>
  <!-- Logo area -->
  <rect x="80" y="80" width="80" height="80" rx="16" fill="url(#accent)"/>
  <text x="120" y="133" font-family="system-ui, sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle">L</text>
  <!-- Title -->
  <text x="80" y="240" font-family="system-ui, sans-serif" font-size="56" font-weight="bold" fill="white">
    ${escapeXml(title)}
  </text>
  <!-- Description -->
  <text x="80" y="310" font-family="system-ui, sans-serif" font-size="28" fill="#94A3B8">
    ${escapeXml(description.length > 80 ? description.substring(0, 77) + '...' : description)}
  </text>
  <!-- Bottom tagline -->
  <text x="80" y="540" font-family="system-ui, sans-serif" font-size="22" fill="#475569">
    learnstack.dev
  </text>
  <!-- Decorative dots -->
  <circle cx="1050" cy="150" r="80" fill="#0284C7" opacity="0.1"/>
  <circle cx="1100" cy="450" r="120" fill="#38BDF8" opacity="0.05"/>
</svg>`

  setHeader(event, 'content-type', 'image/svg+xml')
  setHeader(event, 'cache-control', 'public, max-age=86400')
  return svg
})

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
