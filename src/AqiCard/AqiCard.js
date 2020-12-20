import React from 'react'
import PropTypes from 'prop-types'
import './AqiCard.css'
import { faceGreen, humidity, windDirection } from '../assets'

const AqiCard = props => {
  const {
    data: {
      city = '',
      state = '',
      country = '',
      current: {
        weather: { tp = 30, hu = 60, ws = 10, wd = 90, ic = '01d' } = {},
        pollution: { aqius } = {},
      } = {},
    } = {},
  } = props

  return (
    <div className='container'>
      <div className='locationBox'>
        <div className='city'>{city}</div>
        <div className='state'>{`${state}, ${country}`}</div>
      </div>
      <div className='pollutionBox'>
        <img className='faceAqi' src={faceGreen} alt={''} />
        <div className='aqi'>
          <div className='aqiValue'>{aqius}</div>
          <div className='aqiTitle'>{'US AQI'}</div>
        </div>
        <div className='condition'>{'Good'}</div>
      </div>
      <div className='weatherBox'>
        <div className='temperatureInfo'>
          <img
            className='weatherIcon'
            src={`https://www.airvisual.com/images/${ic}.png`}
            alt={`icon-${ic}`}
          />
          <div className='temperature'>{`${tp}°C`}</div>
        </div>
        <div className='windInfo'>
          <img
            className='windDirection'
            style={{ transform: `rotate(${wd}deg)` }}
            src={windDirection}
            alt='wind-direction'
          />
          <div className='windSpeed'>{`${(ws * 3.6).toFixed(1)} km/h`}</div>
        </div>
        <div className='humidityInfo'>
          <img className='humidityIcon' src={humidity} alt='humidity-icon' />
          <div className='humidityValue'>{`${hu}%`}</div>
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
      }),
    }),
  }),
}

export default AqiCard
