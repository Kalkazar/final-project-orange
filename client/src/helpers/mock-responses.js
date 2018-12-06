export const files = [
  { uid: 1, name: 'My life.txt', containerId: null, inTrash: false },
  { uid: 4, name: 'My life.txt', containerId: null, inTrash: false },
  { uid: 5, name: 'My life.txt', containerId: null, inTrash: false },
  { uid: 6, name: 'My life.txt', containerId: null, inTrash: false },
  { uid: 7, name: 'My life.txt', containerId: null, inTrash: false },
  { uid: 8, name: 'My life.txt', containerId: null, inTrash: false },
  { uid: 9, name: 'My life.txt', containerId: null, inTrash: false },

  {
    uid: 2,
    name: "Josh's fun times in paintball.mpeg",
    containerId: 1,
    inTrash: false
  },
  {
    uid: 3,
    name: 'John doing his thing but thrown away.mpeg',
    containerId: 1,
    inTrash: true
  }
]

export const folders = [
  { uid: 1, name: 'Fun Times', inTrash: false },
  { uid: 2, name: 'Empty Times', inTrash: false },
  { uid: 3, name: 'Trash times', inTrash: true }
]

/**
 * @typedef FileResponse
 * @property {Number} uid File's unique ID
 * @property {String} name File's name
 * @property {Number} [containerId] File's containing folder, file contained in root if null or undefined
 * @property {Boolean} inTrash Whether or not file is currently in the trash bin/staged for permanent deletion
 */
