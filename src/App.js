import { useCallback, useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import createPersistedState from 'use-persisted-state'
import Loading from './Loading'
import LocationList from './LocationList'
import { getNearData, refreshData } from './utils'

const useLocationsState = createPersistedState('locations')
const Container = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  min-height: 100vh;
`

const App = () => {
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useLocationsState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (!locations.length) {
        const data = await getNearData()
        if (data) setLocations([data])
      } else {
        setLocations(await refreshData(locations))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDragEnd = useCallback(
    result => {
      const { source, destination } = result
      const sIndex = source?.index
      const dIndex = destination?.index
      if (!destination || sIndex === dIndex) return
      setLocations(locations => {
        const newLocations = [...locations]
        const [sItem] = newLocations.splice(sIndex, 1)
        newLocations.splice(dIndex, 0, sItem)
        return newLocations
      })
    },
    [setLocations]
  )

  return (
    <Container>
      {loading && <Loading />}
      <DragDropContext onDragEnd={onDragEnd}>
        <LocationList locations={locations} listId='locations' />
      </DragDropContext>
    </Container>
  )
}

export default App
