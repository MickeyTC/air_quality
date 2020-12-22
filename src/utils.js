import axios from 'axios'
import { response } from './mock/nearestCity'

const KEY = process.env.REACT_APP_API_KEY

const joinStrings = (separator = ' ') => (...strings) =>
  strings
    .filter(Boolean)
    .map(s => s.trim())
    .join(separator)

const convertToSelectOptions = (values = []) =>
  values?.map(value => ({ value, label: value }))

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
    //       `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
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

const getCountries = async () => {
  // console.log('getCountries')
  try {
    const res = await axios.get(
      `https://api.airvisual.com/v2/countries?key=${KEY}`
    )
    return res?.data?.data?.map(({ country }) => country)
  } catch (e) {
    console.error(e)
  }
}

const getStates = async country => {
  // console.log('getStates', country)
  try {
    const res = await axios.get(
      `https://api.airvisual.com/v2/states?country=${country}&key=${KEY}`
    )
    return res?.data?.data?.map(({ state }) => state)
  } catch (e) {
    console.error(e)
  }
}

const getCities = async (state, country) => {
  // console.log('getCities', state, country)
  try {
    const res = await axios.get(
      `https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${KEY}`
    )
    return res?.data?.data?.map(({ city }) => city)
  } catch (e) {
    console.error(e)
  }
}

export {
  getNearData,
  refreshData,
  joinStrings,
  convertToSelectOptions,
  getCountries,
  getStates,
  getCities,
}
