export const formatDate = (date?: string | Date) => {
  if (!date) return ''
  if (isNaN(Date.parse(date.toString()))) return date.toString()
  return new Date(date).toLocaleString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export * from './reminder'
