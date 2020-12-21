import PropTypes from 'prop-types'
import styled from 'styled-components'
import AqiCard from './AqiCard'

const Container = styled.div``

const Wrapper = styled.div`
  margin: 1.5em;
`

const LocationList = props => {
  const { locations = [] } = props

  return (
    <Container>
      {locations.map(location => (
        <Wrapper
          key={`${location?.city}-${location?.state}-${location?.country}`}
        >
          <AqiCard data={location} />
        </Wrapper>
      ))}
    </Container>
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
}

export default LocationList
