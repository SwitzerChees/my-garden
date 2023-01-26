import { Plant, Tag } from '@my-garden/common/definitions'
import lfp from 'lodash/fp'
const { filter, uniqBy } = lfp

interface GetTagsParams {
  query?: string
  withDummy?: boolean
  exclude?: Tag[]
}

export const useQueries = () => {
  const { getSafeAPIResponse } = useAPI()
  const { find, findOne } = useStrapi()
  const strapiuser = $(useStrapiUser())

  const getTags = async ({ query = '', withDummy = false, exclude = [] }: GetTagsParams): Promise<Tag[]> => {
    const { ok, result } = await getSafeAPIResponse<Tag[]>(
      find('tags', {
        filters: {
          name: {
            $containsi: query,
          },
        },
      })
    )
    if (!ok) return []
    const tags = result
    if (withDummy && query) {
      tags.push({ name: query } as Tag)
    }
    return uniqBy((t: Tag) => t.name.trim())(filter((t: Tag) => filter((e: Tag) => e.name === t.name)(exclude).length === 0)(tags))
  }

  const getPlant = async (plantId: number): Promise<Plant | undefined> => {
    const { ok, result } = await getSafeAPIResponse<Plant>(
      findOne('plants', plantId, {
        populate: ['tags', 'history.photo', 'photo'],
      })
    )
    if (!ok) return
    return result
  }

  const getPlants = async ({ filter = '' }): Promise<Plant[]> => {
    const { ok, result } = await getSafeAPIResponse<Plant[]>(
      find('plants', {
        filters: {
          $and: [
            { user: strapiuser?.id },
            {
              $or: [
                { name: { $containsi: filter } },
                {
                  tags: { name: { $containsi: filter } },
                },
              ],
            },
          ],
        },
        populate: ['tags', 'history', 'photo'],
      })
    )
    if (!ok) return []
    return result
  }

  return $$({ getTags, getPlant, getPlants })
}
