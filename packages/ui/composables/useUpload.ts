import lfp from 'lodash/fp'
import { Media, MediaFormat } from '@my-garden/common/definitions'
import { RuntimeConfig } from '~~/definitions'
const { first } = lfp

interface ImageResponsiveSource {
  src: string
  srcSet: string
}

export const useUpload = () => {
  let progressUpload = $ref(false)
  const token = $(useStrapiToken())

  const runtimeConfig: RuntimeConfig = useRuntimeConfig()
  const uploadUrl = runtimeConfig.public.strapi.url + '/api/upload'
  const { plantUrl } = $(useDefaultImages())
  const mediaUrl = (mediaFormat?: MediaFormat) => {
    if (!mediaFormat?.url) return plantUrl
    return runtimeConfig.public.strapi.url + mediaFormat?.url
  }

  const getResponsiveImageSource = (media?: Media) => {
    if (!media) return undefined
    const responsiveImageSource: ImageResponsiveSource = { src: media.url || mediaUrl(media), srcSet: '' }
    const srcSets: string[] = []
    if (media?.formats?.thumbnail) srcSets.push(mediaUrl(media.formats.thumbnail))
    if (media?.formats?.small) srcSets.push(mediaUrl(media.formats.small))
    if (media?.formats?.medium) srcSets.push(mediaUrl(media.formats.medium))
    if (media?.formats?.large) srcSets.push(mediaUrl(media.formats.large))
    responsiveImageSource.srcSet = srcSets.filter((src) => !!src).join(', ')
    return responsiveImageSource
  }

  const beforeUpload = ({ xhr }: { xhr: XMLHttpRequest }) => {
    progressUpload = true
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
  }

  const getMediaFromResult = ({ xhr: { response: photos } }: { xhr: { response: string } }): Media | undefined => {
    progressUpload = false
    return first(JSON.parse(photos)) as Media
  }

  return $$({
    uploadUrl,
    mediaUrl,
    getResponsiveImageSource,
    progressUpload,
    beforeUpload,
    getMediaFromResult,
  })
}
