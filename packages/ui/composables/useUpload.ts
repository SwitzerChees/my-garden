import lfp from 'lodash/fp'
import { Media, MediaFormat } from '@my-garden/common/definitions'
import { RuntimeConfig } from '~~/definitions'
const { first } = lfp

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

  const getResponsiveImageSourceSet = (media?: Media) => {
    if (!media) return undefined
    const srcSets: string[] = []
    const formatToSrcSet = (format: MediaFormat) => `${mediaUrl(format)} ${format.width}w`
    if (media?.formats?.thumbnail) srcSets.push(formatToSrcSet(media.formats.thumbnail))
    if (media?.formats?.small) srcSets.push(formatToSrcSet(media.formats.small))
    if (media?.formats?.medium) srcSets.push(formatToSrcSet(media.formats.medium))
    if (media?.formats?.large) srcSets.push(formatToSrcSet(media.formats.large))
    const srcSet = srcSets.filter((src) => !!src).join(', ')
    return srcSet
  }

  const beforeUpload = ({ xhr }: { xhr: XMLHttpRequest }) => {
    progressUpload = true
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
  }

  const getMediaFromResult = ({ xhr: { response: photos } }: { xhr: { response: string } }): Media | undefined => {
    return first(JSON.parse(photos)) as Media
  }

  return $$({
    uploadUrl,
    mediaUrl,
    getResponsiveImageSourceSet,
    progressUpload,
    beforeUpload,
    getMediaFromResult,
  })
}
