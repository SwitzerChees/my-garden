import { HistoryElement, Plant } from '@my-garden/common/definitions'

export const useMutations = () => {
  const { getSafeAPIResponse } = useAPI()
  const { create, update } = useStrapi()
  const strapiuser = $(useStrapiUser())
  let isLoading = $ref(false)

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
    const dbAction = plant.id === undefined ? create('plants', plantPayload) : update('plants', plant.id, plantPayload)
    isLoading = true
    const { ok, result } = await getSafeAPIResponse<Plant>(dbAction)
    isLoading = false
    if (!ok || !result) return
    return result
  }

  const addHistoryElement = async (plantId: number, historyElement: HistoryElement) => {
    if (!plantId) return
    isLoading = true
    const { ok, result } = await getSafeAPIResponse<HistoryElement>(
      create('history-elements', {
        ...historyElement,
        plant: plantId,
      }),
    )
    isLoading = false
    if (!ok || !result) return
    return result
  }

  const updatePlantStatus = async (plantId: number, status: 'active' | 'archived') => {
    if (!plantId) return
    isLoading = true
    const { ok, result } = await getSafeAPIResponse<Plant>(update('plants', plantId, { status }))
    isLoading = false
    if (!ok || !result) return
    return result
  }

  const updateHistoryElementStatus = async (historyElementId: number, status: 'active' | 'archived') => {
    if (!historyElementId) return
    isLoading = true
    const { ok, result } = await getSafeAPIResponse<HistoryElement>(update('history-elements', historyElementId, { status }))
    isLoading = false
    if (!ok || !result) return
    return result
  }

  return $$({ addOrUpdatePlant, addHistoryElement, updatePlantStatus, updateHistoryElementStatus, isLoading })
}
