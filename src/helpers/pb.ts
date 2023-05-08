import PocketBase from 'pocketbase'
const baseUrl = import.meta.env.VITE_BASE_URL

const pb = new PocketBase(baseUrl)