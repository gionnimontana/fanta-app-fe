import { pb } from "./pb"

export const sendEditRequest = async (url: string, payload: any) => {
  const userID = pb.authStore.model?.id
  const userToken = pb.authStore.token
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': userToken
      },
      body: JSON.stringify({...payload, userID})
  })
  return response
}