import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

interface Photo {
  imageName: string
  uploadPath: string
}

const processFile = (file: formidable.File) => {
  if (!file) return
  if (!file.mimetype?.startsWith('image/')) return
  if (!file.originalFilename) return
  const dateString = new Date().toISOString().slice(0, -5).replace(/-/g, '').replace(/:/g, '').replace('T', '').slice(0, -1)
  const imageName = `${dateString}_${Math.round(Math.random() * 100000)}.${file.originalFilename.split('.').pop()}`
  const tempPath = file.filepath
  const uploadPath = `${path.join('uploads', imageName)}`
  fs.copyFileSync(tempPath, uploadPath)
  fs.unlinkSync(tempPath)
  return { imageName, uploadPath } as Photo
}

const parseBody = async (req: any): Promise<{ fields: formidable.Fields; photos: Photo[] }> => {
  const form = formidable({ multiples: true })
  const result = await new Promise((resolve) => {
    const photos: Photo[] = []
    form.parse(req, (err, fields, files) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        return resolve({ fields, photos })
      }
      for (const key of Object.keys(files)) {
        if (!key.startsWith('photo')) continue
        const file = files[key]
        if (file instanceof Array) {
          file.forEach((file) => {
            const photo = processFile(file)
            if (photo) photos.push(photo)
          })
          continue
        }
        const photo = processFile(file)
        if (photo) photos.push(photo)
      }
      resolve({ fields, photos })
    })
  })
  return result as any
}

export { parseBody }
