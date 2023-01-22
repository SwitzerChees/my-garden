export const actionToIcon = (action?: string) => {
  if (action === 'added') return 'material-symbols:add-circle-rounded'
  if (action === 'updated') return 'ic:round-mode-edit'
  if (action === 'watered') return 'mdi:watering-can'
  if (action === 'fertilized') return 'healthicons:nutrition'
  if (action === 'repotted') return 'material-symbols:potted-plant-outline'
  if (action === 'pruned') return 'fontisto:scissors'
  if (action === 'image') return 'material-symbols:photo-camera'
  if (action === 'sterilized') return 'simple-line-icons:chemistry'
  if (action === 'measured') return 'gis:measure'
  return 'material-symbols:question-mark'
}
