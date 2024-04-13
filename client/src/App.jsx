import { useEffect, useState } from 'react'
import { getAllVisitors } from './services/api'
import './App.css'

function App() {

  const [visitors, setVisitors] = useState([])

  useEffect(() => {
    fetchVisitors()
  }, [])

  const fetchVisitors = async () => {
    const visitorsData = await getAllVisitors()
    setVisitors(visitorsData)
  }

  return (
    <div>
      <h3>Liste des visiteurs</h3>
      <ul>
        {visitors.map(visitor => (
          <li key={visitor.numVisiteur}>{visitor.nom}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
