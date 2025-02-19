
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NeramFreelancerForm from './Forms/NeramFreelancerForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreelancerFormDisplay from './Forms/FreelancerFormDisplay';


import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';


function App() {
 

  return (
    <Router>
     <Navbar /> 
        {/* You can include a top navbar if needed */}
     
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/NeramFreelancerForm" element={<NeramFreelancerForm />} />
          <Route path="/FreelancerFormDisplay" element={<FreelancerFormDisplay />} />
        </Routes>
  
      <ToastContainer />
  </Router>
  )
}

export default App
