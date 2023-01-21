import { Plant } from '~~/definitions'

export const photoUrl = (plant: Plant) => {
  const basePath = '/uploads/'
  return `${basePath}${plant?.photo?.imageName || 'plant.png'}`
}
