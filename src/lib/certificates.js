import registry from '../certificates.json'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export function normalizeId(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, '')
    .toUpperCase()
}

function buildIndex() {
  const index = new Map()

  if (Array.isArray(registry)) {
    registry.forEach((record) => {
      const id = normalizeId(record?.certificateNumber)
      if (id) index.set(id, record)
    })
    return index
  }

  if (registry && typeof registry === 'object') {
    Object.entries(registry).forEach(([key, value]) => {
      const id = normalizeId(key)
      if (!id) return
      index.set(id, {
        certificateNumber: key,
        name: value?.name ?? value?.['Full Name'] ?? '',
        certificateType: value?.certificateType ?? '',
        event: value?.event ?? '',
        issueDate: value?.issueDate ?? '',
        ...value,
      })
    })
  }

  return index
}

const index = buildIndex()

export const certificateCount = index.size

export function findCertificate(input) {
  const id = normalizeId(input)
  if (!id) return null
  return index.get(id) ?? null
}

export function formatIssueDate(value) {
  if (!value) return '—'
  const raw = String(value).trim()
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (match) {
    const [, y, m, d] = match
    const month = MONTHS[Number(m) - 1]
    if (month) return `${d} ${month} ${y}`
  }
  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, '0')
    return `${day} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`
  }
  return raw
}
