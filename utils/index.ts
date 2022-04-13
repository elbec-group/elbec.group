export const get = (obj: object, path: string, defValue: string | undefined = undefined): any => {
  if (!path) return undefined

  const pathArray: any = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  const result: object[] = pathArray.reduce(
    (prevObj: any, key: number) => prevObj && prevObj[key],
    obj
  )
  return result === undefined ? defValue : result
}