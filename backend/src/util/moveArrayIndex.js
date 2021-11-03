/**
 * @param {any[]} arr
 * @param {number} from
 * @param {number} to
 * @returns {any[]}
 */
function moveArrayIndex(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
}

module.exports = {
  moveArrayIndex,
};
