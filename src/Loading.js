import styled, { keyframes } from 'styled-components'
import { loading } from './assets'

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #00000066;
  z-index: 100;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Img = styled.img`
  height: 40vmin;
  width: 40vmin;
  pointer-events: none;
  animation: ${rotate} infinite 5s linear;
`

const Loading = props => {
  return (
    <Wrapper>
      <Img src={loading} alt='loading' />
    </Wrapper>
  )
}

export default Loading
