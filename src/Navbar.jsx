import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="   justify-center flex bg-black text-white p-6 gap-9 ">
  <Link to="/" className="hover:text-blue-600 font-serif   text-white">Blog</Link>
  <Link to="/blogList" className="hover:text-blue-600 font-serif   text-white">BlogsList</Link>
</nav>

  )
}

export default Navbar