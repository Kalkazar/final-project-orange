import { files, file } from '../helpers/mock-responses'
const axios = require('axios')

export const getFileList = () =>
  new Promise((resolve, reject) => {
    resolve(files)
  })
