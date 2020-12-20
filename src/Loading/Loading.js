import React from 'react'
import { loading } from '../assets'
import './Loading.css'

const Loading = props => {
  return (
    <div className='wrapper'>
      <img src={loading} className='loading' alt='loading' />
    </div>
  )
}

export default Loading
