import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Layout = () => {
  return (
    <div className='columnfix'>
      <SideBar/>
    
      <div className='maindiv'>
     <NavBar/>
  <div className='outerdiv'>
    <div className='innerdiv'> <Outlet/></div>
  </div>
  
   </div>
    </div>
  )
}

export default Layout