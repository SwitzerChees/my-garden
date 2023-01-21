import { Photo } from '~~/definitions'

export const photoUrl = (photo?: Photo) => {
  const basePath = '/uploads/'
  return `${basePath}${photo?.imageName || 'plant.png'}`
}

export const formatDate = (date?: string | Date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
