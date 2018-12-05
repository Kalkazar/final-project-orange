export const files = [
  { uid: 1, name: 'My life.txt', folder: null, inTrash: false },
  {
    uid: 2,
    name: "Josh's fun times in paintball.mpeg",
    folder: 1,
    inTrash: false
  },
  {
    uid: 2,
    name: 'John doing his thing but thrown away.mpeg',
    folder: 1,
    inTrash: true
  }
]

export const folders = [
  { uid: 1, name: 'Fun Times', inTrash: false },
  { uid: 2, name: 'Empty Times', inTrash: false },
  { uid: 3, name: 'Trash times', inTrash: true }
]
