import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs
  const getBlogs = async () => {
    try {
      const { data } = await axios.get("https://sigma-blog-backend.vercel.app/api/get/blog");
      setBlogs(data?.AllData || []);
    } catch (error) {
      toast.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sigma-blog-backend.vercel.app/api/delete/blog/${id}`);
      toast.success("Blog deleted");
      getBlogs(); // refresh list
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header with Add Blog Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">All Blogs</h2>
        <Link
          to="/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add Blog
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={blog.image?.url}
                      alt={blog.title}
                      className="h-16 w-24 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold">{blog.title}</td>
                  <td className="py-3 px-4">{blog.author}</td>
                  <td className="py-3 px-4">{blog.category}</td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {blog.description}
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <Link
                      to={`/edit/${blog._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
