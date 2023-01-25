import { Media } from '@my-garden/common/definitions'

export const photoUrl = (photo?: Media) => {
  const basePath = '/'
  return `${basePath}${photo?.url || 'plant.png'}`
}

export const formatDate = (date?: string | Date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const capitalizeFirstLetter = (action?: string) => {
  if (!action) return ''
  return action.charAt(0).toUpperCase() + action.slice(1)
}

export * from './reminder'
export * from './icons'
