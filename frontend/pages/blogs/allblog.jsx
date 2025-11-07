import React, { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import '../style/blogs/allblog.css'

export function AllBlog() {
  const [blogs, setBlogs] = useState([
    {
      "title": "Getting Started with React",
      "body": "Learn how to set up your first React project and build components.",
      "slug": "getting-started-with-react",
      "id": "1"
    },
    {
      "title": "Why JavaScript is Awesome",
      "body": "Understand the power and flexibility of JavaScript for web apps.",
      "slug": "why-javascript-is-awesome",
      "id": "2"
    }
  ]
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog/allblogs");
        setBlogs(response.data);
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
          <div className="blog-card" key={blog.id}>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-body">{blog.body}</p>
            <button className="read-more-btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import '../style/blogs/allblog.css';
// import { api } from "../../lib/axios";

// export function AllBlog() {
//     const [blogs,setblogs] = useState([]);

//   useEffect(()=>{
//     const fetchBlogs = async () => {
//       try {
//         const response = await api.get("/blog/allblogs");
//         setblogs(response.data.data)
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   },[])
// console.log(blogs);

//   return (
//     <div className="blog-page-container">
//       <h2 className="blog-page-title">Featured Posts</h2>
//       <div className="blog-card-wrapper">
//         {blogs.map((blog) => (
//           <div className="blog-card" key={blog._id}>
//             <h3 className="blog-title">{blog.title}</h3>
//             <img className="blog-image" src={blog.image} alt="" />
//             <p className="blog-body">{blog.body}</p>
//             <button className="read-more-btn">Read More</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
