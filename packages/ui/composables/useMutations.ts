import { Plant } from '@my-garden/common/definitions'

export const useMutations = () => {
  const { getSafeAPIResponse } = useAPI()
  const { create, update } = useStrapi()
  const strapiuser = $(useStrapiUser())

  const addOrUpdatePlant = async (plant: any): Promise<Plant | undefined> => {
    if (!plant) return
    const plantPayload = {
      photo: plant.photo,
      name: plant.name.trim(),
      botanicalName: plant.botanicalName.trim(),
      reminder: {
        water: plant.reminder.water || 0,
        fertilize: plant.reminder.fertilize || 0,
      },
      assignedTags: plant.tags,
      user: strapiuser?.id,
    }
    const dbAction = plant.id === undefined ? create('plants', plantPayload) : update(plant.id, plantPayload)
    const { ok, result } = await getSafeAPIResponse<Plant>(dbAction)
    if (!ok || !result) return
    // if (plant.id === undefined) await addHistoryElement(result.id, { action: 'added', photo: plant.photo, createdAt: new Date() })
    // else if (originalPlant) {
    //   await addHistoryElement(result.id, {
    //     action: 'updated',
    //     photo: originalPlant?.photo?.url !== plant.photo?.url ? plant.photo : undefined,
    //     createdAt: new Date(),
    //   })
    // }
    return result
  }
  return $$({ addOrUpdatePlant })
}
