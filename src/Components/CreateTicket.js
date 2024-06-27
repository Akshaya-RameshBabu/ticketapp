import axios from 'axios';
import React, { useState } from 'react'
import baseUrl from './utils';
import "./Bootstrapcss.css"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CreateTicket = () => {
  
  const MySwal = withReactContent(Swal);
  const[errors,seterrors]=useState({
    customerName: '',
        phone:'',
        customerEmail: '',
        title: '',
        description: '',
        priority: '',
        status: '',
        createdDate:'',
  })
    const [form, setForm] = useState({
      customerName: '',
        phone:'',
        customerEmail: '',
        title: '',
        description: '',
        priority: '',
        status: 'created',
        createdDate:'',
      });
     
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';
  
        switch (name) {
          case 'customerName':
            error = value.length < 1 ? 'Please enter  customerName' : '';
            break;
            case 'phone':
            error = value.length < 10 ? 'Phone number must be at least 10 digits' :
           /^\d+$/.test(value) ? '' : 'Please enter a valid phone number (digits only)';
            break;
            case 'customerEmail':
              error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
              break;
              case 'title':
                error = value.length < 1 ? 'Please enter  title' : '';
                break;
                case 'description':
                  error = value.length < 1 ? 'Please enter  description' : '';
                  break;
                  case 'title':
                    error = value.length < 1 ? 'Please enter  title' : '';
                    break;
                    case 'priority':
                      error = value==="Select" ? 'Please Select Priority' : '';
                      break;
                    
            default:
              break;
        }
        seterrors(prevErrors => ({
          ...prevErrors,
          [name]: error
        }));
        setForm({
          ...form,
          [name]: value,
        });

      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        try{
          let hasErrors = false;
          const requiredFields = ['customerName', 'phone', 'customerEmail', 'title', 'description', 'priority', 'status'];
        
          requiredFields.forEach(field => {
            if (!form[field] || form[field].length === 0 || errors[field]) {
              hasErrors = true;
              seterrors(prevErrors => ({
                ...prevErrors,
                [field]: !form[field] ? 'This field is required' : errors[field]
              }));
            }
          });
          if (hasErrors) {
            return;
          }
          const response= await axios.post(`${baseUrl}/createTicket`,form)
          if( response.status===200){
            await MySwal.fire({
              title: "Added !",
              text: "New Ticket Added successfully!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor:"#845BAE"
              
            })
           setForm({    
             customerName: '',
            phone:'',
            customerEmail: '',
            title: '',
            description: '',
            priority: '',
            status: 'created',
            createdDate:'',})
            window.location.href="/viewAllTickets"
          }
        }catch(error){
          MySwal.fire({
            title: "Error Occured !",
            text: error.response,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor:"#845BAE"
            
          })
        }
      };
    
      return (
        <div className='createticketdiv'>
          <h1>Create Ticket</h1>
          <form onSubmit={handleSubmit} >
            <div className='splitform'>
            <div className='first'>
            <div className='inputgrp'>
              <label>Customer Name</label>
              <span>:</span>
              <div>
              <input type="text"
               name="customerName"
                value={form.customerName} 
                onChange={handleChange}
                className={` form-control form-control-lg  ${errors.customerName && 'is-invalid'}`}
                 required />
                 <div className="invalid-feedback">{errors.customerName}</div>
              </div>
            </div>
            <div className='inputgrp'>
              <label>Customer Email</label>
              <span>:</span>
              <div>
              <input type="email" 
              className={` form-control form-control-lg  ${errors.customerEmail && 'is-invalid'}`}
              name="customerEmail" value={form.customerEmail} onChange={handleChange} required />
               <div className="invalid-feedback">{errors.customerEmail}</div>
              </div>
            </div>
            <div className='inputgrp '>
              <label>Customer Phone</label>
              <span>:</span>
              <div>
              <input type="phone"
               name="phone"
                value={form.phone} 
                onChange={handleChange} 
                className={`form-control form-control-lg  ${errors.phone && 'is-invalid'}`}
                required />
                 <div className="invalid-feedback">{errors.phone}</div>
                 </div>
            </div>
            </div>
            <div className='first'>
            <div className='inputgrp'>
              <label>Ticket Title</label>
              <span>:</span>
              <div>
              <input type="text" 
              name="title" 
              value={form.title} 
              onChange={handleChange} 
              className={` form-control form-control-lg  ${errors.title && 'is-invalid'}`}
              required />
               <div className="invalid-feedback">{errors.title}</div>
               </div>
            </div>
            <div className='inputgrp mb-5'>
              <label> Ticket Description</label>
              <span>:</span>
              <div>
              <textarea name="description" 
              value={form.description} 
              className={`form-control form-control-lg  ${errors.description && 'is-invalid'}`}
              onChange={handleChange} 
              required />
              <div className="invalid-feedback">{errors.description}</div>
              </div>
            </div>
            <div className='inputgrp'>
              <label>Priority</label>
              <span>:</span>
              <div>
              <select 
              name="priority"
               value={form.priority}
                onChange={handleChange} 
                className={` form-control form-control-lg  ${errors.priority && 'is-invalid'}`}
                required>
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="invalid-feedback">{errors.title}</div>
               </div>
            </div>
            </div>
           
            {/* <div>
              <label>Category:</label>
              <input type="text" name="category" value={form.category} onChange={handleChange} />
            </div> */}
            </div>
            <div className='alignright'>
            <button  className='btn btn-primary' onClick={handleSubmit}>Create Ticket</button>
            </div>
          </form>
        </div>
      ); 
}

export default CreateTicket