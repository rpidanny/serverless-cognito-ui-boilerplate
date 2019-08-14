import React from 'react'

import './index.css'

const Pitch = () => {
  return (
    <div class='section-pitch'>
      <h1>Serverless Website</h1>
      <p>Cognito authenticated React App</p>
      <button onClick={() => {
        window.location = '/members'
      }}>
        Join For Free
      </button>
    </div>
  )
}

export default Pitch
