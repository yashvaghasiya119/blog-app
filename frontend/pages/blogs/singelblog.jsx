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
   
  </>;
}
