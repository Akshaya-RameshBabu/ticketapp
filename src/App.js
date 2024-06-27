import React, { Children } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTicket from './Components/CreateTicket';
import Layout from './Components/Layout';
import ViewAllTickets from './Components/ViewAllTickets';
import SingleTicket from './Components/SingleTicket';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         <Route element={<Layout/>}>
          <Route path='/' element={<CreateTicket/>}/>
          <Route path='/createTicket'element={<CreateTicket/>}/>
          <Route path='/viewAllTickets' element={<ViewAllTickets/>}/>
          <Route path='/viewTicket/:id' element={<SingleTicket/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
