import { smartNotification } from "../components/generalUI/notifications/notifications"
import { pb } from "./pb"

const sendServerRequest = async (method: string, url: string, payload?: any) => {
  const userID = pb.authStore.model?.id
  const userToken = pb.authStore.token
  const reqParams: RequestInit  = {
    method,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': userToken
    },
  }
  if (payload) {
    reqParams.body = JSON.stringify({...payload, userID})
  }
  const response = await fetch(url, reqParams)

  if (response.status === 401) {
    pb.authStore.clear();
    smartNotification('La tua sessione è scaduta, esci ed effettua nuovamente il login')
  }
  return response
}


export const sendPostRequest = async (url: string, payload: any) => {
  const response = await sendServerRequest('POST', url, payload)
  return response
}

export const sendPatchRequest = async (url: string, payload: any) => {
  const response = await sendServerRequest('PATCH', url, payload)
  return response
}
