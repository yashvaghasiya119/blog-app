import React, { useEffect, useState } from "react";
import '../style/blogs/myblog.css'
import { api } from "../../lib/axios";
import { NavLink } from "react-router-dom";
export function MyBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog/myblogs");
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page-container">
      <h2 className="blog-page-title">Featured Posts</h2>
      <div className="blog-card-wrapper">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h3 className="blog-title">{blog.title}</h3>
            <img src={blog.image} alt="" />
            <p className="blog-body">{blog.body}</p>
            <NavLink to={`/blog/${blog._id}`}><button className="read-more-btn">Read More</button></NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}





   