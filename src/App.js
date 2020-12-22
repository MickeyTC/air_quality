import { useCallback, useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import createPersistedState from 'use-persisted-state'
import ReactModal from 'react-modal'
import Loading from './Loading'
import LocationForm from './LocationForm'
import LocationList from './LocationList'
import { getAqiCity, getNearData, refreshData } from './utils'

const useLocationsState = createPersistedState('locations')

const Container = styled.div`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  min-height: 100vh;
`
const ReactModalAdapter = ({ className, ...props }) => {
  const contentClassName = `${className}__content`
  const overlayClassName = `${className}__overlay`
  return (
    <ReactModal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  )
}

const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #00000066;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }
  &__content {
    outline: none;
  }
`

const App = () => {
  const [locations, setLocations] = useLocationsState([])
  const [loading, setLoading] = useState(false)
  const [isShowForm, setIsShowForm] = useState(false)

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

  const onClickAdd = () => {
    setIsShowForm(true)
  }

  const hideForm = () => {
    setIsShowForm(false)
  }

  const onAddLocation = async ({ country, state, city }) => {
    setIsShowForm(false)
    setLoading(true)
    const location = await getAqiCity({ country, state, city })
    setLocations(locations => [...locations, location])
    setLoading(false)
  }

  return (
    <Container>
      {loading && <Loading />}
      <DragDropContext onDragEnd={onDragEnd}>
        <LocationList locations={locations} listId='locations' />
      </DragDropContext>
      <StyledModal
        isOpen={isShowForm}
        onRequestClose={hideForm}
        ariaHideApp={false}
        closeTimeoutMS={200}
      >
        <LocationForm initialLocation={locations[0]} onAdd={onAddLocation} />
      </StyledModal>
      <button onClick={onClickAdd}>ADD</button>
    </Container>
  )
}

export default App
