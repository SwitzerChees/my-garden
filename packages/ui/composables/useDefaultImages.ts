import { DefaultImages, Media } from '@my-garden/common/definitions'
import { RuntimeConfig } from '~~/definitions'

export const useDefaultImages = () => {
  let plant: Media | undefined = $ref()
  let logo: Media | undefined = $ref()
  const { getSafeAPIResponse } = useAPI()
  const { findOne } = useStrapi()

  const runtimeConfig: RuntimeConfig = useRuntimeConfig()

  const fetchDefaultImages = async () => {
    const { ok, result } = await getSafeAPIResponse<DefaultImages>(
      findOne('default-image', {
        populate: ['plant', 'logo'],
      })
    )
    if (!ok) return
    plant = result?.plant
    logo = result?.logo
  }

  const logoUrl = $computed(() => {
    if (!logo?.url) return '/logo.png'
    return runtimeConfig.public.strapi.url + logo?.url
  })
  const plantUrl = $computed(() => {
    if (!plant?.url) return '/plant.png'
    return runtimeConfig.public.strapi.url + plant?.url
  })

  fetchDefaultImages()
  return $$({ plant, logo, logoUrl, plantUrl })
}
