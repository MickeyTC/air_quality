import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { response } from './mock/nearestCity'
import Loading from './Loading'

function App() {
  const KEY = process.env.REACT_APP_API_KEY
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    const getNearData = async () => {
      try {
        // const res = await axios.get(
        //   `https://api.airvisual.com/v2/nearest_city?key=${KEY}`
        // )
        const res = response
        setData(res?.data?.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    getNearData()
  }, [])

  const ic = data?.current?.weather?.ic || '01d'

  return (
    <div className='App'>
      {loading && <Loading />}
      <img
        className='icon'
        src={`https://www.airvisual.com/images/${ic}.png`}
        alt={`icon-${ic}`}
      />
    </div>
  )
}

export default App
