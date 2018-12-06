export const files = [
  ...(new Array(15).fill({ uid: 1, name: 'My life.txt', containerId: null, inTrash: false })),
  ...(new Array(15).fill({ uid: 1, name: 'Josh\'s fun times in paintball.mpeg', containerId: null, inTrash: false })),
  ...(new Array(15).fill({ uid: 1, name: 'John doing his thing but thrown away.mpeg', containerId: null, inTrash: false }))
]

// [
//   { uid: 1, name: 'My life.txt', containerId: null, inTrash: false },
//   { uid: 4, name: 'My life.txt', containerId: null, inTrash: false },
//   { uid: 5, name: 'My life.txt', containerId: null, inTrash: false },
//   { uid: 6, name: 'My life.txt', containerId: null, inTrash: false },
//   { uid: 7, name: 'My life.txt', containerId: null, inTrash: false },
//   { uid: 8, name: 'My life.txt', containerId: null, inTrash: false },
//   { uid: 9, name: 'My life.txt', containerId: null, inTrash: false },

// {
//   uid: 2,
//   name: 'Josh\'s fun times in paintball.mpeg',
//   containerId: 1,
//   inTrash: false
// },
// {
//   uid: 3,
//   name: 'John doing his thing but thrown away.mpeg',
//   containerId: 1,
//   inTrash: true
// }

// ].map((e, i, arr) => arr).reduce((acc, curr) => [...acc, ...curr], [])

export const folders = [
  {
    'uid': 1,
    'name': 'Test',
    'created': '2018-12-06T18:10:13.641+0000',
    'lastModified': '2018-12-06T18:10:13.641+0000',
    'filesContained': [],
    'foldersContained': [
      {
        'uid': 2,
        'name': 'Test',
        'created': '2018-12-06T18:12:01.174+0000',
        'lastModified': '2018-12-06T18:12:09.053+0000',
        'filesContained': [
          {
            'uid': 1,
            'name': 'Test.txt',
            'created': '2018-12-06T18:09:52.889+0000',
            'lastModified': '2018-12-06T18:12:28.835+0000',
            'containerId': 2,
            'inTrash': false
          }
        ],
        'foldersContained': [],
        'containerId': 1,
        'inTrash': false
      }
    ],
    'inTrash': false
  },
  {
    'uid': 2,
    'name': 'Test',
    'created': '2018-12-06T18:12:01.174+0000',
    'lastModified': '2018-12-06T18:12:09.053+0000',
    'filesContained': [
      {
        'uid': 1,
        'name': 'Test.txt',
        'created': '2018-12-06T18:09:52.889+0000',
        'lastModified': '2018-12-06T18:12:28.835+0000',
        'containerId': 2,
        'inTrash': false
      }
    ],
    'foldersContained': [],
    'containerId': 1,
    'inTrash': false
  }
]

/**
 * @typedef FileResponse
 * @property {Number} uid File's unique ID
 * @property {String} name File's name
 * @property {Number} [containerId] File's containing folder, file contained in root if null or undefined
 * @property {Boolean} inTrash Whether or not file is currently in the trash bin/staged for permanent deletion
 */

/**
 * @typedef FolderResponse
 * @property {Number} uid Folder's unique ID
 * @property {String} name Folder's name
 * @property {FileResponse[]} filesContained Files this folder directly contains
 * @property {FolderResponse[]} foldersContained Folders this folder directly contains
 * @property {Number} [containerId] Folder's containing folder, folder contained in root if null or undefined
 * @property {Boolean} inTrash Whether or not file is currently in the trash bin/staged for permanent deletion
 */
