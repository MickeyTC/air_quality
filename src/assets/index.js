import loading from './logo.svg'
import windDirection from './wind_direction.svg'
import humidity from './humidity.svg'
import faceGreen from './ic-face-green.svg'
import faceYellow from './ic-face-yellow.svg'
import faceOrange from './ic-face-orange.svg'
import faceRed from './ic-face-red.svg'
import facePurple from './ic-face-purple.svg'
import faceMaroon from './ic-face-maroon.svg'
import weather01d from './01d.png'
import weather01n from './01n.png'
import weather02d from './02d.png'
import weather02n from './02n.png'
import weather03d from './03d.png'
import weather04d from './04d.png'
import weather09d from './09d.png'
import weather10d from './10d.png'
import weather10n from './10n.png'
import weather11d from './11d.png'
import weather13d from './13d.png'
import weather50d from './50d.png'

const getWeatherIcon = icon => {
  switch (icon) {
    case '01d':
      return weather01d
    case '01n':
      return weather01n
    case '02d':
      return weather02d
    case '02n':
      return weather02n
    case '03d':
      return weather03d
    case '04d':
      return weather04d
    case '09d':
      return weather09d
    case '10d':
      return weather10d
    case '10n':
      return weather10n
    case '11d':
      return weather11d
    case '13d':
      return weather13d
    case '50d':
      return weather50d
    default:
      return
  }
}

export {
  loading,
  windDirection,
  humidity,
  faceGreen,
  faceYellow,
  faceOrange,
  faceRed,
  facePurple,
  faceMaroon,
  getWeatherIcon,
}
