import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { response } from './mock/nearestCity'
import Loading from './Loading'
import AqiCard from './AqiCard'

const Container = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const App = () => {
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

  return (
    <Container>
      {loading && <Loading />}
      <AqiCard data={data} />
    </Container>
  )
}

export default App
