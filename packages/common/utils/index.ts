export const formatDate = (date?: string | Date) => {
  if (!date) return ''
  if (isNaN(Date.parse(date.toString()))) return date.toString()
  return new Date(date).toLocaleString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const relativeDate = (date?: string | Date) => {
  if (!date) return ''
  if (isNaN(Date.parse(date.toString()))) return date.toString()
  const now = new Date()
  const dateToCompare = new Date(date)
  const diff = dateToCompare.getTime() - now.getTime()
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays < 0) return `${diffDays} ${diffDays === -1 ? 'day' : 'days'} ago`
  return `in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`
}

export * from './reminder'
