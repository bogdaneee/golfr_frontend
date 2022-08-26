import useSWR from 'swr'
import { getToken } from './userAuth'

export const NAME_URL = id => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`

const useUserName = id => {

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error()
      // Attach extra info to the error object.
      error.message = await res.json()
      error.status = res.status
      throw error
    }

    return res.json().then(data => data.name)
  }

  const { data, error } = useSWR(NAME_URL(id), fetcher)

  return {
    name: data,
    error: error,
  }
}

export default useUserName
