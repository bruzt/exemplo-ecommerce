export default function SortIdsByFrequency(arr: number[]) {
  const frequency = arr.reduce<{ [key: string]: number }>((obj, curr) => {
    obj[curr] = (obj[curr] || 0) + 1;
    return obj;
  }, {});
  const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  const uniqueIds = sorted.map((id) => id[0]);
  return uniqueIds.map(Number);
}
