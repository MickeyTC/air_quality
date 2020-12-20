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
      <div className='location box column'>
        <div className='city'>{city}</div>
        <div className='state'>{`${state}, ${country}`}</div>
      </div>
      <div className='pollution box'>
        <img className='face-aqi info' src={faceGreen} alt={''} />
        <div className='aqi info column'>
          <div className='aqi-value'>{aqius}</div>
          <div className='aqi-title'>{'US AQI'}</div>
        </div>
        <div className='condition info'>{'Good'}</div>
      </div>
      <div className='weather box'>
        <div className='temperature info'>
          <img
            className='weather-icon'
            src={`https://www.airvisual.com/images/${ic}.png`}
            alt={`icon-${ic}`}
          />
          <div className='temperature'>{`${tp}°C`}</div>
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
      }),
    }),
  }),
}

export default AqiCard
