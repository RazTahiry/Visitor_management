import { useEffect, useState } from 'react'
import { getAllVisitors } from './services/api'
import { Tables } from './components/Table'
import { VisitorChart } from './components/Chart'
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
    <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 px-3 pt-5">
      <div className='w-full flex justify-center'>
        <VisitorChart />
      </div>

      <div className='w-full flex justify-center mb-5 lg:mb-0'>
        <Tables visiteurs={visitors} />
      </div>
    </div>
  )
}

export default App
