import { Tag } from '@my-garden/common/definitions'
import lfp from 'lodash/fp'
const { filter, uniqBy } = lfp

interface GetTagsParams {
  query?: string
  withDummy?: boolean
  exclude?: Tag[]
}

export const useQueries = () => {
  const { getSafeAPIResponse } = useAPI()
  const { find } = useStrapi()

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
  return $$({ getTags })
}
