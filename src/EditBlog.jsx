import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
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

  const navigate = useNavigate();
  const { id } = useParams();

  // Get single blog
  const getBlog = async () => {
    try {
      const { data } = await axios.get(`https://sigma-blog-backend.vercel.app/api/get/blog/${id}`);
      console.log(data);

      setAuthor(data?.getSingle?.author);
      setTitle(data?.getSingle?.title);
      setDescription(data?.getSingle?.description);
      setCategory(data?.getSingle?.category);
      toast.success("Blog loaded");
    } catch (error) {
      toast.error("Something went wrong while loading blog");
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("ajay",
        author,
        title,
        description,
        category,);

      const { data } = await axios.put(`https://sigma-blog-backend.vercel.app/api/edit/blog/${id}`, {
        author,
        title,
        description,
        category,
        image:imageBase64
      });

      console.log(data);

      toast.success("Blog updated");
      // navigate("/bloglist");
    } catch (error) {
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-gray-900 text-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select category</option>
              <option value="MERN">MERN</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Other">Other</option>
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


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
