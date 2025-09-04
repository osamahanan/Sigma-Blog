import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom'
const AddBlog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [imageBase64, setImageBase64] = useState("");


    const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post("https://sigma-blog-backend.vercel.app/api/save/blog", {
        author, title, description, image: imageBase64, category
      })
      console.log(data);
      toast.success(data.message)
      navigate("/")
    } catch (error) {
      toast.error("Somthing Went Wrong")

      console.log(error?.error)
    }
  }

  return (
    
    
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
     
    <Link to="/add" className="hover:text-blue-600 text-white font-serif  cursor-pointer"/>
      
      <div className="bg-gray-900 text-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Blog</h2>

        <form onSubmit={handlesubmit} className="space-y-5">
          {/* Author */}
          <div>
            <label className="block mb-1 text-sm font-medium">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="Enter author name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"

            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter blog title"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write blog description"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Category */}
          <div >
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select category</option>
              <option>MERN</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>Other</option>
            </select>
          </div>



          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              accept="image/*"
              onChange={handleImageChange}
              type="file"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
