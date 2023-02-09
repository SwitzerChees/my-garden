import lfp from 'lodash/fp'
import { Media, MediaFormat } from '@my-garden/common/definitions'
import { RuntimeConfig } from '~~/definitions'
const { first } = lfp

export const useUpload = () => {
  let progressUpload = $ref(false)
  const token = $(useStrapiToken())

  const runtimeConfig: RuntimeConfig = useRuntimeConfig()
  const uploadUrl = runtimeConfig.public.strapi.url + '/api/upload'
  const plantUrl = '/plant.png'
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

  const getResponsiveImageSizes = (media?: Media) => {
    if (!media) return undefined
    const sizes: string[] = []
    const formatToSize = (format: MediaFormat) => `(max-width: ${format.width}px) ${format.width}px`
    if (media?.formats?.thumbnail) sizes.push(formatToSize(media.formats.thumbnail))
    if (media?.formats?.small) sizes.push(formatToSize(media.formats.small))
    if (media?.formats?.medium) sizes.push(formatToSize(media.formats.medium))
    if (media?.formats?.large) sizes.push(formatToSize(media.formats.large))
    const size = sizes.filter((src) => !!src).join(', ')
    return size
  }

  const responsiveMediaUrl = (width: number, media?: Media) => {
    if (!media?.url) return plantUrl
    if (!media.formats) return mediaUrl(media)
    const closestFormat = Object.values(media.formats).reduce((prev, curr) => {
      return Math.abs(curr.width - width) < Math.abs(prev.width - width) ? curr : prev
    })
    if (!closestFormat) return mediaUrl(media)
    return mediaUrl(closestFormat)
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
    responsiveMediaUrl,
    getResponsiveImageSourceSet,
    getResponsiveImageSizes,
    progressUpload,
    beforeUpload,
    getMediaFromResult,
  })
}
