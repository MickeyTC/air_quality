import axios from 'axios'
import { response } from './mock/nearestCity'

const KEY = process.env.REACT_APP_API_KEY

const joinStrings = (separator = ' ') => (...strings) =>
  strings
    .filter(Boolean)
    .map(s => s.trim())
    .join(separator)

const getNearData = async () => {
  try {
    // const res = await axios.get(
    //   `https://api.airvisual.com/v2/nearest_city?key=${KEY}`
    // )
    const res = await new Promise((res, rej) => {
      setTimeout(res, 1000, response)
    })
    return res?.data?.data
  } catch (e) {
    console.error(e)
  }
}

const refreshData = async locations => {
  try {
    // const res = await Promise.allSettled(
    //   locations.map(({ city, state, country }) =>
    //     axios.get(
    //       `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
    //     )
    //   )
    // )
    // return res.map(({ status, value }, i) =>
    //   status === 'fulfilled' ? value?.data?.data : locations[i]
    // )
    return new Promise((res, rej) => {
      setTimeout(res, 2000, locations)
    })
  } catch (e) {
    console.error(e)
  }
}

export { getNearData, refreshData, joinStrings }
