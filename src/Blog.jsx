import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { server } from './main';

const Blog = () => {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`${server}/api/get/blog`)
      setBlogs(data?.AllData);
      console.log(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 tracking-wide">
        Latest <span className="text-blue-500">Blogs</span>
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden group"
          >
            {/* Image */}
            <div className="overflow-hidden relative">
              <img
                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                src={blog.image?.url}
                alt={blog.title}
              />
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {blog.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 text-gray-200">
              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span>{blog.date}</span>
                <span className="italic">By {blog.author}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition">
                {blog.title}
              </h3>

              <p className="text-gray-300 text-sm line-clamp-3">
                {blog.description}
              </p>

              <div className="flex justify-end mt-5">
                <Link
                  to={`/blog/${blog._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
