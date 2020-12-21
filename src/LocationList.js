import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import AqiCard from './AqiCard'

const Wrapper = styled.div`
  margin: 1.5em;
`

const LocationList = props => {
  const { locations = [], listId } = props

  return (
    <Droppable droppableId={listId}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {locations.map((location, index) => (
            <Draggable
              draggableId={`${location?.city}-${location?.state}-${location?.country}`}
              key={`${location?.city}-${location?.state}-${location?.country}`}
              index={index}
            >
              {provided => (
                <Wrapper
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <AqiCard data={location} />
                </Wrapper>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
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
  listId: PropTypes.string.isRequired,
}

export default LocationList
