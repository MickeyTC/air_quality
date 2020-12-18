import React from 'react'
import logo from './logo.svg'
import './Loading.css'

const Loading = props => {
  return (
    <div className='wrapper'>
      <img src={logo} className='loading' alt='loading' />
    </div>
  )
}

export default Loading
