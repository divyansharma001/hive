import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import useGetProfile from './hooks/useGetProfile';


function App() {

  //custom hooks

  const id = "10"
  useGetProfile(id);

  return (
    <>
   <div className='w-full h-fit bg-[#000000] text-[#FFDB00]'>
   <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
  }}
/>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </div>
    </>
  )
}

export default App
