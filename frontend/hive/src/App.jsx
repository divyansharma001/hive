import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Content from './pages/Content/Content'

function App() {

  return (
    <>
     <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-2'><Sidebar/></div>
      <div className='col-span-10'><Content/></div>
     </div>
    </>
  )
}

export default App
