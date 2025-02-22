import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IssueTracker from './components/IssueTracker'
import { IssueProvider } from './context/IssueContext'

function App() {
  return (
    <>
      <IssueProvider>
        <div className="container mx-auto p-8">
          <IssueTracker />
        </div>
      </IssueProvider>
    </>
  )
}

export default App
