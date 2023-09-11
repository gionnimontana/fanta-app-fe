import PocketBase from 'pocketbase'
const baseUrl = import.meta.env.VITE_PB_BASE_URL

export const pb = new PocketBase(baseUrl)

export interface APIresponse { ok: boolean, message?: string }