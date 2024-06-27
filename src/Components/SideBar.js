import React, { useState } from 'react'
import "./styles.css"
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
  const[activelink,setActiveLink]=useState("/createTicket");
  const nav=useNavigate();
  const handleclick=(link)=>{
  setActiveLink(link);
  nav(link)
  }
  return (
    <div className='sidebardiv'>
        
        
        <div className='sidebarelement'><i className='fa-solid fa-ticket majoricon'> </i> </div>
       
        <div className='sidebarelement'></div>
        <div className='sidebarelement'></div>
        <div onClick={()=>{handleclick("/createTicket")}} className={` sidebarelement ${activelink.includes("/createTicket")? "ActiveLink" : ""} `}>
        <i className={`fa-solid fa-plus  text-light pt-1 pr-1 ${activelink.includes("/createTicket")? "ActiveLink" : " text-dark"} `}></i> 
        <h6>Create Ticket</h6>
        </div>
        <div onClick={()=>{handleclick("/viewAllTickets")}}  className={` sidebarelement ${activelink.includes("/viewAllTickets")? "ActiveLink" : ""} `} >
        <i className={`fa-solid fa-eye  text-light pt-1 pr-1 ${activelink.includes("/viewAllTickets")? "ActiveLink" : " text-dark"} `}></i> <h6>View Ticket</h6></div>
    
    </div>
  )
}

export default SideBar