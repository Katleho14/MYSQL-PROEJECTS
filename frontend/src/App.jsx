import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center space-y-4">
  <button
    onClick={() => setCount((count) => count + 1)}
    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition duration-200 shadow"
  >
    count is {count}
  </button>
  <p className="text-gray-600">
    Edit <code className="bg-gray-100 px-1 rounded text-sm">src/App.jsx</code> and save to test HMR
  </p>
</div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
