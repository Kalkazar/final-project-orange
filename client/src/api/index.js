import { files, folders, file } from '../helpers/mock-responses'
import Axios from 'axios'

export const getFileList = () =>
  new Promise((resolve, reject) => {
    resolve(files)
  })

// Appropriate endpoint - get all files
// Axios.get('file/all')
//   .then()

export const getFolderList = () =>
  new Promise((resolve, reject) => {
    resolve(folders)
  })

// Appropriate endpoint - get all folders
// Axios.get('folder/all')
//   .then()
