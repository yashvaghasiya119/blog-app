import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import "../style/blogs/singelblog.css";

export function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/${id}`);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="loading-message">Loading...</div>;
  }

  return <>
    <div className="single-blog-container">
      <h1 className="single-blog-title">{blog.title}</h1>

      {blog.image && (
        <div className="single-blog-image-wrapper">
          {!imageLoaded && <div className="image-loading">Loading image...</div>}

          <img
            className={`single-blog-image blog-image ${imageLoaded ? "visible" : "hidden"}`}
            src={blog.image}
            alt={blog.title}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      <p className="single-blog-body">{blog.body}</p>

      {blog.hashtags && blog.hashtags.length > 0 && (
        <div className="hashtags">
          {blog.hashtags.map((tag, index) => (
            <span key={index} className="hashtag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </>;
}
