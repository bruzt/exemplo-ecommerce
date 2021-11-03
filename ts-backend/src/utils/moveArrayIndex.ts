export function moveArrayIndex(array: any[], from: number, to: number) {
  array.splice(to, 0, array.splice(from, 1)[0]);
  return array;
}
