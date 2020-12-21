import React from 'react'
import PropTypes from 'prop-types'
import './AqiCard.css'
import {
  faceGreen,
  faceMaroon,
  faceOrange,
  facePurple,
  faceRed,
  faceYellow,
  humidity,
  windDirection,
} from '../assets'

const getAqiStyle = aqi => {
  if (aqi <= 50) {
    return {
      face: faceGreen,
      condition: 'Good',
      className: 'aqi-green',
    }
  } else if (aqi <= 100) {
    return {
      face: faceYellow,
      condition: 'Moderate',
      className: 'aqi-yellow',
    }
  } else if (aqi <= 150) {
    return {
      face: faceOrange,
      condition: 'Unhealthy for sensitive groups',
      className: 'aqi-orange',
    }
  } else if (aqi <= 200) {
    return {
      face: faceRed,
      condition: 'Unhealthy',
      className: 'aqi-red',
    }
  } else if (aqi <= 300) {
    return {
      face: facePurple,
      condition: 'Very unhealthy',
      className: 'aqi-purple',
    }
  } else {
    return {
      face: faceMaroon,
      condition: 'Hazardous',
      className: 'aqi-maroon',
    }
  }
}

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
  const { face, condition, className: aqiClass } = getAqiStyle(aqi)

  return (
    <div className='container'>
      <div className='location box column'>
        <div className='city info'>{city}</div>
        <div className='state info'>{`${state}, ${country}`}</div>
      </div>
      <div className={`pollution box ${aqiClass}`}>
        <img className='face-aqi info' src={face} alt={''} />
        <div className='aqi info column'>
          <div className='aqi-value'>{aqi}</div>
          <div className='aqi-title'>{useUSAqi ? 'US AQI' : 'CN AQI'}</div>
        </div>
        <div className='condition info'>{condition}</div>
      </div>
      <div className='weather box'>
        <div className='temperature info'>
          <img
            className='weather-icon'
            src={`https://www.airvisual.com/images/${ic}.png`}
            alt={`icon-${ic}`}
          />
          <div className='temperature-value'>{`${tp}°C`}</div>
        </div>
        <div className='wind info'>
          <img
            className='wind-direction'
            style={{ transform: `rotate(${wd}deg)` }}
            src={windDirection}
            alt='wind-direction'
          />
          <div className='wind-speed'>{`${(ws * 3.6).toFixed(1)} km/h`}</div>
        </div>
        <div className='humidity info'>
          <img className='humidity-icon' src={humidity} alt='humidity-icon' />
          <div className='humidity-value'>{`${hu}%`}</div>
        </div>
      </div>
    </div>
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
