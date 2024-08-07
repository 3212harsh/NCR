import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'


function App() {

  return (
    <section className='w-[100%] h-screen flex flex-row'>
      <Navbar/>
      <div className='flex flex-col w-full overflow-y-auto'>
        <Header/>
        <Outlet/>
      </div>
    </section>
  )
}

export default App
