
/**
 * Creates an 2D array from a 1D array
 * @param {any[]} arr Base array
 * @param {Number} groupSize Max size of each nested array
 */
const groupArray = (arr, groupSize) => {
  let resultArr = []

  for (let i = 0; i < arr.length; i += groupSize) {
    resultArr.push(arr.slice(i, i + groupSize))
  }

  return resultArr
}

export { groupArray }
