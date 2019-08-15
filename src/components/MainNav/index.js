import React from 'react'

import './index.css'

const MainNav = () => {
  return (
    <div class='main-nav'>
      <button onClick={() => {
        window.location = '/dashboard'
      }}>
        Sign In
      </button>
    </div>
  )
}

export default MainNav
