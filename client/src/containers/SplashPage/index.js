import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Fade } from 'reactstrap'

const StyledSplash = styled.div`
  padding: 20px;
  font-size: 80pt;
  @media (max-width: 790px) {
    font-size: 40pt;
  }
  @media (max-width: 400px) {
    font-size: 25pt;
  }
  margin: 20% 5% 20% 10%;
  width: 100%;
  height: 100%;
`

class SplashPage extends Component {
  state = {
    redirect: false,
    fadeIn: true
  }

  componentWillMount () {
    setTimeout(() => this.setState({ fadeIn: false }), 4500)
    setTimeout(() => this.setState({ redirect: true }), 5000)
  }

  render () {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/library' />
    }

    return (
      <Fade in={this.state.fadeIn} tag='h5' className='mt-3'>
        <StyledSplash>Welcome to Goggle Dive!</StyledSplash>
      </Fade>
    )
  }
}

export default SplashPage
