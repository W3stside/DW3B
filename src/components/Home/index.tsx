import React from 'react'

const Home: React.FC = props => {
  return (
    <div>
      <h1>Welcome to your app!</h1>
      <h4>Your current app theme is:</h4>
      {JSON.stringify(props, null, 2)}
    </div>
  )
}

export default Home
