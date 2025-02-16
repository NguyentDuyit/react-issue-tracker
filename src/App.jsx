import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IssueTracker from './components/IssueTracker'

function App() {
  return (
    <>
      <div className="container mx-auto p-8">
        <IssueTracker></IssueTracker>
      </div>
    </>
  )
}

export default App
