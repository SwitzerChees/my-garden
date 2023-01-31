export const capitalizeFirstLetter = (action?: string) => {
  if (!action) return ''
  return action.charAt(0).toUpperCase() + action.slice(1)
}

export * from '@my-garden/common/utils/reminder'
export * from './icons'
