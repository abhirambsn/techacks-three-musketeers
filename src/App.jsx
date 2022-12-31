import { useState } from 'react'
import Home from './components/Home'
import Mission from './components/Mission'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Home />
      <Mission />
    </div>
  )
}

export default App
