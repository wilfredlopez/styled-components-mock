import logo from './logo.svg'
import './App.css'

import { Link } from 'react-router-dom'

import styled from './styled-mock'

const Text = styled.p<{ color: string }>`
  color: ${props => props.color};
  background: rgb(58 53 53 / 33%);
  user-select: none;
  &:hover{
    color: white;
    background: black;
  }
`

const StyledLink = styled(Link) <{ hoverColor?: string }>`
  text-decoration: none;
  &:hover{
    color: ${props => props.hoverColor || 'red'};
  }
`

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
      animation: App-logo-spin infinite 20s linear;
  }
`

const AppHeader = styled.header`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: white;
  
@media (max-width: 900px) {
  & p {
    text-decoration:underline;
  }
}
`

function App() {
  return (
    <div className="App">
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <Text color="red">
          Edit <code>src/App.tsx</code> and save to reload.
        </Text>
        <StyledLink
          className="App-link"
          to="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </StyledLink>
      </AppHeader>
    </div>
  )
}

export default App
