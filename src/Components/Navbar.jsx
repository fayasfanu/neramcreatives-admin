
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
 
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center px-6">
 
      <ul className="flex space-x-6 text-lg">
        <li>
          <Link to="/NeramFreelancerForm" className="hover:text-gray-300 transition duration-300">
            Freelancer Form
          </Link>
        </li>
        <li>
          <Link to="/FreelancerFormDisplay" className="hover:text-gray-300 transition duration-300">
            Display Form
          </Link>
        </li>
      </ul>

  
      <div className="flex items-center space-x-6">
        {/* Dummy Login Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">
          Login
        </button>

        {/* Logo */}
        {/* <img src="/logo.png" alt="Neram Creatives" className="h-10 w-auto" /> */}
      </div>
    </div>
  </nav>



  )
}

export default Navbar