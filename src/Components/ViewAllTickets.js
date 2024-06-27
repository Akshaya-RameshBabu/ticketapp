import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from './utils';

const ViewAllTickets = () => {
  
  const MySwal = withReactContent(Swal);
  const [form, setForm] = useState([{
    id:'',
    customerName: '',
    phone:'',
    customerEmail: '',
    title: '',
    description: '',
    priority: '',
    status: 'created',
    createdDate:'',
    category: ''
  }]);
  useEffect(() => {
    // Simulating fetching data from the server
    const fetchData = async () => {
      try {
        // Fetch data from server
        const response = await axios.get(`${baseUrl}/getTickets`,{
         
        });
        const data = response.data;
        setForm(data.reverse());
      } catch (error) {
        MySwal.fire({
          title: "Error Occured !",
          text: error.response,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor:"#845BAE"
        })
      }
    };

    fetchData();
  }, []);
      
  const [filterOption, setFilterOption] = useState("All");
  const [searchQuery, setSearchQuery] = useState('');
   
  const filterData = () => {
    if (filterOption === "All") {
      return form;
    } else if (filterOption === "High") {
      return form.filter(form =>form.priority === 'High');
    } else if (filterOption === "Low") {
      return form.filter(form => form.priority === 'Low');
    }
    else if (filterOption === "Medium") {
      return form.filter(form => form.priority === 'Medium');
    }else if(filterOption==="search"){
      return form.filter(form =>form.customerEmail && form.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  };
  const handleDelete =async (id,titlegiven)=>{
    const title=titlegiven
    MySwal.fire({
      title: "Delete Ticket",
      text: `Are you sure you want to Delete this Ticket ${title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (id != null) {
            const response = await axios.delete(`${baseUrl}/DeleteTicket/${id}`);
            
            if (response.status===200) {
              MySwal.fire({
                title: "Deleted",
                text: `The ticket ${title} deleted successfully`,
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                window.location.reload();
            });
            }
          } 
        } catch (error) {
         
          MySwal.fire({
            icon: 'error',
            title: 'ERROR',
            text: error.response
        });
        
      }
      }  
    });
  };
 
  return (
    <div className='p-4'>
       <div style={{ display: 'grid', gridTemplateColumns: '25fr 10fr 6fr 6fr' }} className='mb-4'>
        <h1>Tickets Detail</h1>
        <input
        className="form-control"
        style={{ marginTop: "10px" }}
        type="search"
        placeholder="Search by Email"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setFilterOption("search");
        }}
        />
                   <select
                    className="form-select btn btn-primary mr-5 ml-5 text-left p-2 "
                   
                    value={filterOption}
                   onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option  className='bg-light text-dark ' value="All">All</option>
                    <option className='bg-light text-dark' value="Low">Low</option>
                    <option className='bg-light text-dark' value="Medium">Medium</option>
                    <option className='bg-light text-dark' value="High">High</option>
                  </select>
        <a href="/createTicket" className='btn btn-primary'><i className="fa-solid fa-plus"></i> Create Ticket</a>
      </div>
      <div className="table-container">
    <table className="table table-hover table-bordered table-sm">
      <thead className='thead-dark'>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Email</th>
          <th scope="col">Date of Creation</th>
          <th scope="col">Phone</th>
          <th scope="col"> Title</th>
          <th scope="col">Status</th>
          <th scope='col'>Priority</th>
          <th colSpan="3" scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
      {filterData().map((ticket, index) => (
          <tr key={ticket.id}>
            <th scope="row" ><Link to={`/viewTicket/${ticket.id}`}>{index + 1}</Link></th>
            <td className='py-2'> {ticket.customerName}</td>
            <td className='py-2'>{ticket.customerEmail}</td>
            <td className='py-2'>{ticket.createdDate}</td>
            <td className='py-2'>{ticket.phone}</td>
            <td className='py-2'>{ticket.title}</td>
            <td className='py-2'>{ticket.status}</td>

            <td className='py-2'>
  {ticket.priority === 'Low' && <div className='low'><i className="fa-solid fa-circle pr-3"></i>Low</div>}
  {ticket.priority === 'Medium' && <div className='medium'><i className="fa-solid fa-circle pr-3"></i>Medium</div>}
  {ticket.priority === 'High' && <div className='high'><i className="fa-solid fa-circle pr-3"></i>High</div>}
</td>
           <td className='text-center'>
            <button  className='hidebtn' onClick={()=>{handleDelete(ticket.id,ticket.title)}}>
                <i className="fas fa-trash"></i>
                </button>
            </td>
           
           
          </tr>
        ))}
      </tbody>
    </table></div>
    </div>
  )
}

export default ViewAllTickets