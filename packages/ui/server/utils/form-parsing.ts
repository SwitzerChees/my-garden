import fs from 'fs'
import path from 'path'
// eslint-disable-next-line import/default
import jp from 'jpeg-autorotate'
import formidable from 'formidable'
import { Photo } from '@my-garden/common/definitions'

const processFile = async (file: formidable.File) => {
  if (!file) return
  if (!file.mimetype?.startsWith('image/')) return
  if (!file.originalFilename) return
  const dateString = new Date().toISOString().slice(0, -5).replace(/-/g, '').replace(/:/g, '').replace('T', '').slice(0, -1)
  const imageName = `${dateString}_${Math.round(Math.random() * 100000)}.${file.originalFilename.split('.').pop()}`
  const tempPath = file.filepath
  const uploadPath = `${path.join('static', imageName)}`
  fs.copyFileSync(tempPath, uploadPath)
  fs.unlinkSync(tempPath)
  if (file.mimetype === 'image/jpeg') {
    await fixRotateForJPEG(uploadPath)
  }
  return { imageName } as Photo
}

const fixRotateForJPEG = async (file: string) => {
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const { buffer } = await jp.rotate(file, {
      quality: 80,
    })
    fs.writeFileSync(file, Buffer.from(buffer))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

const parseBody = async (req: any): Promise<{ fields: formidable.Fields; photos: Photo[] }> => {
  const form = formidable({ multiples: true })
  const result = await new Promise((resolve) => {
    const photos: Photo[] = []
    form.parse(req, async (err, fields, files) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        return resolve({ fields, photos })
      }
      for (const key of Object.keys(files)) {
        if (!key.startsWith('photo')) continue
        const file = files[key]
        if (file instanceof Array) {
          for (const currFile of file) {
            const photo = await processFile(currFile)
            if (photo) photos.push(photo)
          }
          continue
        }
        const photo = await processFile(file)
        if (photo) photos.push(photo)
      }
      resolve({ fields, photos })
    })
  })
  return result as any
}

export { parseBody }
