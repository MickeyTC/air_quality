import PropTypes from 'prop-types'
import { memo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import AqiCard from './AqiCard'

const Container = styled.div`
  width: 60vw;
  min-width: 400px;
  max-width: 650px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 17em;
  padding-bottom: 1em;
  ${({ isDragging }) => (isDragging ? 'opacity: 0.5;' : '')}
`

const LocationList = props => {
  const { locations = [], droppableId } = props

  return (
    <Droppable droppableId={droppableId}>
      {provided => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {locations.map((location, index) => (
            <Draggable
              draggableId={`${location?.city}-${location?.state}-${location?.country}`}
              key={`${location?.city}-${location?.state}-${location?.country}`}
              index={index}
            >
              {(provided, snapshot) => (
                <Wrapper
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                >
                  <AqiCard data={location} />
                </Wrapper>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  )
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    })
  ),
  droppableId: PropTypes.string.isRequired,
}

export default memo(LocationList)
