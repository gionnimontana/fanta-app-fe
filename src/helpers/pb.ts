import PocketBase from 'pocketbase'
const baseUrl = import.meta.env.VITE_BASE_URL

export const pb = new PocketBase(baseUrl)

export interface APIresponse { ok: boolean, message?: string }

export const pbCreate = async (collection: string, data: any): Promise<APIresponse> => {
  let res: { ok: boolean } = { ok: false }
  try {
      await pb.collection(collection).create(data)
      res.ok = true
  } catch (e) {
  }
  return res
}

export const pbUpdate = async (collection: string, id: string, data: any): Promise<APIresponse> => {
  let res: { ok: boolean } = { ok: false }
  try {
      await pb.collection(collection).update(id, data)
      res.ok = true
  } catch (e) {
  }
  return res
}

export const pbDelete = async (collection: string, id: string): Promise<APIresponse> => {
  let res: { ok: boolean } = { ok: false }
  try {
      await pb.collection(collection).delete(id)
      res.ok = true
  }
  catch (e) {
  }
  return res
}
