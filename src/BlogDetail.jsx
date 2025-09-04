import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { server } from "./main";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);



  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`${server}/api/get/blog/${id}`);
      console.log("API Response:", data);
      setBlog(data?.getSingle);
    } catch (error) {
      console.error("Error fetching blog detail:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex justify-center items-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700 p-6">
        {/* Left Side Image */}
        <div className="flex justify-center items-center">
          {blog?.image ? (
            <img
              src={blog.image.url}
              alt={blog?.title}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          ) : (
            <div className="w-full h-[450px] bg-gray-500 flex justify-center items-center rounded-2xl">
              <span className="text-white">No image available</span>
            </div>
          )}
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col justify-between p-4">
          {/* Category & Date */}
          <div className="flex justify-between items-center mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {blog?.category}
            </span>
            <span className="text-gray-400">{blog?.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-6 text-white leading-snug drop-shadow-lg">
            {blog?.title}
          </h1>

          {/* Description */}
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            {blog?.description}
          </p>

          {/* Author */}
          <p className="text-sm text-gray-400 italic border-l-4 border-blue-500 pl-3 mb-6">
            ✍️ Written by{" "}
            <span className="font-semibold text-white">{blog?.author}</span>
          </p>

          {/* Back Button */}
          <div className="mt-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              ⬅ Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
