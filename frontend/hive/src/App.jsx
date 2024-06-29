import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Content from './pages/Content/Content'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
   <div className='w-full h-fit bg-[#000000] text-[#FFDB00]'>
    <Navbar/>
    <Outlet/>
   </div>
    </>
  )
}

export default App
