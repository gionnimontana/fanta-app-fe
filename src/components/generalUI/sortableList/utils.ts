export function arrayMove(arr: Array<any>, oldIndex: number, newIndex: number) {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}

export const customSortItemUp = (arr: Array<any>, cb: (a: Array<any>) => void, itemId: any) => () => {
  const arrCopy = [...arr]
  const index = arrCopy.findIndex((item) => item.id === itemId)
  if (index > 0) {
    const newArr = arrayMove(arrCopy, index, index - 1)
    cb(newArr)
  }
}
