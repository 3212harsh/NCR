import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider,Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Assets_services from './components/Dashboard/Assets_services.jsx'
import Showall from './components/Showall.jsx'
import DetailedHost from './components/DetailedHost.jsx'
import SearchResult from './components/SearchResult.jsx'

import VirusScan from './pages/VirusScan.jsx'
import SSL from './pages/SSL.jsx'
import DetailedSSH from './components/SSL/SSLdetailed.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Dashboard/>}>
        <Route path='' element = {<Assets_services/>}></Route>
        <Route path='showall/:service' element = {<Showall/>} ></Route>
        <Route path='search' element={<SearchResult/>} />
      </Route> 
      <Route path='show/:ip' element={<DetailedHost/>}  ></Route>
      <Route path='/SSL' element={<SSL/>}>
      </Route>
      <Route path='/ssldetails/:serial' element={<DetailedSSH/>} ></Route>
      <Route path='/VirusScan' element={<VirusScan/>} ></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
