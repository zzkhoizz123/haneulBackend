// const config = require('../config')
const streamBuffers = require('stream-buffers')
const path = require('path')
const cloudinary = require('cloudinary').v2
const LZUTF8 = require('lzutf8')

const folder = 'Hanuel'
// config https://cloudinary.com/documentation/node_integration#overview

cloudinary.config({
  cloud_name: 'dgwaryybk',
  api_key: '138611157411678',
  api_secret: 'N1JPP6DEZM2YIsimxyeRJu_vQlY'
})
const uploadStreamImage = async (name, data) => {
  try {
    return new Promise(async (resolve, reject) => {
      const newName = folder + '/' + name
      const uploadStream = await cloudinary.uploader.upload_stream({ folder: newName, use_filename: true, unique_filename: true }, function (err, image) {
        if (err) { return reject(err) }
        console.log('url' + image.url)
        resolve(image)
      })
      const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10, // in milliseconds.
        chunkSize: 2048 // in bytes.
      })
      // let base64Data = data.replace(/^data:image\/jpeg;base64,/, '')
      // base64Data = data.replace(/^data:image\/png;base64,/, '')
      // base64Data = (base64Data).replace(/^data:image\/octet-stream;base64,/, '')
      myReadableStreamBuffer.put(data, 'buffer')
      myReadableStreamBuffer.stop()
      myReadableStreamBuffer.pipe(uploadStream)
    })
  } catch (error) {
    console.log('uploadStreamImage', error)
    return null
  }
}

const uploadStreamImageBase64 = async (name, data) => {
  try {
    return new Promise(async (resolve, reject) => {
      const newName = folder + '/' + name
      const uploadStream = await cloudinary.uploader.upload_stream({ folder: newName, use_filename: true, unique_filename: true }, function (err, image) {
        if (err) { return reject(err) }
        console.log('url' + image.url)
        resolve(image)
      })
      const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10, // in milliseconds.
        chunkSize: 2048 // in bytes.
      })
      // let base64Data = data.replace(/^data:image\/jpeg;base64,/, '')
      // base64Data = data.replace(/^data:image\/png;base64,/, '')
      // base64Data = (base64Data).replace(/^data:image\/octet-stream;base64,/, '')
      myReadableStreamBuffer.put(data, 'base64')
      myReadableStreamBuffer.stop()
      myReadableStreamBuffer.pipe(uploadStream)
    })
  } catch (error) {
    console.log('uploadStreamImage', error)
    return null
  }
}
const uploadImage = (name) => {
  try {
    return new Promise(async (resolve, reject) => {
      cloudinary.uploader.upload(path.resolve(__dirname, `../files/images/${name}`), { tags: 'basic_sample', folder: 'images', public_id: `${name}-${Date.now()}` }, function (err, image) {
        if (err) { return reject(err) }
        console.log('url' + image.url)
        resolve(image)
      })
    })
  } catch (error) {
    console.log('uploadImage', error)
    return null
  }
}

const deleteImage = (name) => {
  try {
    return new Promise(async (resolve, reject) => {
      cloudinary.uploader.destroy(name, function (err, image) {
        if (err) { return reject(null) }
        resolve(image.secure_url)
      })
    })
  } catch (error) {
    console.log('deleteImage', error)
    return null
  }
}

const decompressLZUTF8AndUploadStreamImage = async (folder, data) => {
  try {
    const input = LZUTF8.decompress(data, { inputEncoding: 'Base64', outputEncoding: 'Buffer' })
    const response = await uploadStreamImage(folder, input)
    return response.url
  }
  catch (error) {
    console.log('decompressLZUTF8AndUploadStreamImage', error)
    return null
  }
}
module.exports = {
  uploadStreamImage,
  uploadImage,
  deleteImage,
  decompressLZUTF8AndUploadStreamImage,
  uploadStreamImageBase64
}
