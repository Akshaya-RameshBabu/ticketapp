import axios from 'axios';
import React, { useEffect,  useState } from 'react'
import baseUrl from './utils';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from 'react-router-dom';

const SingleTicket = () => {
  
  const MySwal = withReactContent(Swal);
  const {id}=useParams();
  const [form, setForm] = useState({
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
  });
  useEffect(() => {
    // Simulating fetching data from the server
    const fetchData = async () => {
      try {
        // Fetch data from server
        const response = await axios.get(`${baseUrl}/getTickets/${id}`,{
         
        });
        const data = response.data;
       console.log(data)
        setForm(data);
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
  return (
    <div className='createticketdiv'>
          <h1>Create Ticket</h1>
          <div >
            <div className='splitform'>
            <div className='first'>
            <div className='inputgrp'>
              <label>Customer Name</label>
              <span>:</span>
              <label>{form.customerName} </label>
            </div>
            <div className='inputgrp'>
              <label>Customer Email</label>
              <span>:</span>
              <label>{form.customerEmail}</label>
            </div>
            <div className='inputgrp'>
              <label>Customer Phone</label>
              <span>:</span>
              <label> {form.phone}</label>
            </div>
            </div>
            <div className='first'>
            <div className='inputgrp'>
              <label>Subject</label>
              <span>:</span>
              <label>{form.title} </label>
            </div>
            <div className='inputgrp'>
              <label>Description</label>
              <span>:</span>
              <label > {form.description}</label>
            </div>
            <div className='inputgrp'>
              <label>Priority</label>
              <span>:</span>
              <label >{form.priority}</label>
            </div>
            </div>
           
           
            </div>
           
          </div>
        </div>
  )
}

export default SingleTicket