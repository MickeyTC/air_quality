import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  faceGreen,
  faceMaroon,
  faceOrange,
  facePurple,
  faceRed,
  faceYellow,
  humidity,
  windDirection,
} from './assets'

const getAqiStyle = aqi => {
  if (aqi <= 50) {
    return {
      face: faceGreen,
      condition: 'Good',
      styleProps: { color: '#607631', background: '#a8e05f' },
    }
  } else if (aqi <= 100) {
    return {
      face: faceYellow,
      condition: 'Moderate',
      styleProps: { color: '#8c6c1d', background: '#ffdf58' },
    }
  } else if (aqi <= 150) {
    return {
      face: faceOrange,
      condition: 'Unhealthy for sensitive groups',
      styleProps: { color: '#974a20', background: '#ff9b57' },
    }
  } else if (aqi <= 200) {
    return {
      face: faceRed,
      condition: 'Unhealthy',
      styleProps: { color: '#942431', background: '#fe6a69' },
    }
  } else if (aqi <= 300) {
    return {
      face: facePurple,
      condition: 'Very unhealthy',
      styleProps: { color: '#543b63', background: '#a97abc' },
    }
  } else {
    return {
      face: faceMaroon,
      condition: 'Hazardous',
      styleProps: { color: '#573344', background: '#a87383' },
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #333333;
  width: 60vw;
  min-width: 400px;
  max-width: 650px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const Box = styled.div`
  display: flex;
  padding: 1em;
`

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
`

const LocationBox = styled(Box)`
  flex-direction: column;
  background-color: rgb(255, 255, 245);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const CityInfo = styled(Info)`
  font-size: 1.5em;
  font-weight: 700;
`

const StateInfo = styled(Info)`
  font-weight: 500;
  color: #666666;
  margin-top: 0.2em;
`

const PollutionBox = styled(Box)(({ color, background }) => ({
  color,
  background,
}))

const FaceAqi = styled.img`
  height: 4em;
`

const AqiInfo = styled(Info)`
  flex-direction: column;
`

const AqiValue = styled.div`
  font-size: 2.5em;
  font-weight: 400;
`

const AqiTitle = styled.div`
  font-size: 0.8em;
  font-weight: 500;
`

const ConditionInfo = styled(Info)`
  font-weight: 600;
  font-size: 1.2em;
`

const WeatherBox = styled(Box)`
  background-color: honeydew;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

const WeatherValue = styled.div`
  margin-left: 0.5em;
  font-weight: 500;
  font-size: 1.1em;
`

const WeatherIcon = styled.img`
  height: 3em;
`

const WindDirection = styled.img`
  height: 1.5em;
  filter: invert(0.5) sepia(1) saturate(1) hue-rotate(108deg);
  transform: rotate(${({ direction }) => direction}deg);
`

const HumidityIcon = styled.img`
  height: 1.5em;
  filter: invert(0.5) sepia(1) saturate(5) hue-rotate(157deg);
`

const AqiCard = props => {
  const {
    data: {
      city = '',
      state = '',
      country = '',
      current: {
        weather: { tp = 30, hu = 60, ws = 10, wd = 90, ic = '01d' } = {},
        pollution: { aqius = 0, aqicn = 0 } = {},
      } = {},
    } = {},
    useUSAqi = true,
  } = props

  const aqi = useUSAqi ? aqius : aqicn
  const { face, condition, styleProps } = getAqiStyle(aqi)

  return (
    <Container>
      <LocationBox>
        <CityInfo>{city}</CityInfo>
        <StateInfo>{`${state}, ${country}`}</StateInfo>
      </LocationBox>
      <PollutionBox {...styleProps}>
        <Info>
          <FaceAqi src={face} alt='face' />
        </Info>
        <AqiInfo>
          <AqiValue>{aqi}</AqiValue>
          <AqiTitle>{useUSAqi ? 'US AQI' : 'CN AQI'}</AqiTitle>
        </AqiInfo>
        <ConditionInfo>{condition}</ConditionInfo>
      </PollutionBox>
      <WeatherBox>
        <Info>
          <WeatherIcon
            src={`https://www.airvisual.com/images/${ic}.png`}
            alt={`icon-${ic}`}
          />
          <WeatherValue>{`${tp}°C`}</WeatherValue>
        </Info>
        <Info>
          <WindDirection
            direction={wd}
            src={windDirection}
            alt='wind-direction'
          />
          <WeatherValue>{`${(ws * 3.6).toFixed(1)} km/h`}</WeatherValue>
        </Info>
        <Info>
          <HumidityIcon src={humidity} alt='humidity-icon' />
          <WeatherValue>{`${hu}%`}</WeatherValue>
        </Info>
      </WeatherBox>
    </Container>
  )
}

AqiCard.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    current: PropTypes.shape({
      weather: PropTypes.shape({
        tp: PropTypes.number,
        hu: PropTypes.number,
        ws: PropTypes.number,
        wd: PropTypes.number,
        ic: PropTypes.string,
      }),
      pollution: PropTypes.shape({
        aqius: PropTypes.number,
        aqicn: PropTypes.number,
      }),
    }),
  }),
  useUSAqi: PropTypes.bool,
}

export default AqiCard