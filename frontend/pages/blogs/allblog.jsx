// import React, { useEffect, useState } from "react";
// import { api } from "../../lib/axios";
// import '../style/blogs/allblog.css'

// export function AllBlog() {
//   const [blogs, setBlogs] = useState([
//     {
//       "title": "Getting Started with React",
//       "body": "Learn how to set up your first React project and build components.",
//       "slug": "getting-started-with-react",
//       "id": "1"
//     },
//     {
//       "title": "Why JavaScript is Awesome",
//       "body": "Understand the power and flexibility of JavaScript for web apps.",
//       "slug": "why-javascript-is-awesome",
//       "id": "2"
//     }
//   ]
//   );

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await api.get("/blog/allblogs");
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="blog-page-container">
//       <h2 className="blog-page-title">Featured Posts</h2>
//       <div className="blog-card-wrapper">
//         {blogs.map((blog) => (
//           <div className="blog-card" key={blog.id}>
//             <h3 className="blog-title">{blog.title}</h3>
//             <p className="blog-body">{blog.body}</p>
//             <button className="read-more-btn">Read More</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import '../style/blogs/allblog.css';
import { api } from "../../lib/axios";

export function AllBlog() {
    const [blogs,setblogs] = useState([]);
  const [main] = useState([
    {
      id: "1",
      title: "Getting Started with React",
      body: "Learn how to set up your first React project and build components.",
      slug: "getting-started-with-react"
    },
    {
      id: "2",
      title: "Why JavaScript is Awesome",
      body: "Understand the power and flexibility of JavaScript for web apps.",
      slug: "why-javascript-is-awesome"
    },
    {
      id: "3",
      title: "Mastering CSS Flexbox",
      body: "Flexbox is a powerful layout tool. Learn how to use it effectively.",
      slug: "mastering-css-flexbox"
    },
    {
      id: "4",
      title: "React Hooks Deep Dive",
      body: "Explore useState, useEffect, and custom hooks in this detailed guide.",
      slug: "react-hooks-deep-dive"
    },
    {
      id: "5",
      title: "JavaScript ES6 Features",
      body: "Learn the modern features of JavaScript that improve your code.",
      slug: "javascript-es6-features"
    },
    {
      id: "6",
      title: "Responsive Web Design Basics",
      body: "Design websites that look great on all screen sizes.",
      slug: "responsive-web-design-basics"
    },
    {
      id: "7",
      title: "How to Use Git and GitHub",
      body: "A beginner's guide to version control and collaboration.",
      slug: "how-to-use-git-and-github"
    },
    {
      id: "8",
      title: "Understanding APIs",
      body: "What APIs are and how to integrate them into your applications.",
      slug: "understanding-apis"
    },
    {
      id: "9",
      title: "Building a Todo App",
      body: "Learn React by building a simple and useful todo list app.",
      slug: "building-a-todo-app"
    },
    {
      id: "10",
      title: "Debugging JavaScript",
      body: "Tips and tools for finding and fixing bugs in JavaScript.",
      slug: "debugging-javascript"
    }
  ]);

  useEffect(()=>{
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog/allblogs");
        setblogs(response.data.data)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  },[])
console.log(blogs);

  return (
    <div className="blog-page-container">
      <h2 className="blog-page-title">Featured Posts</h2>
      <div className="blog-card-wrapper">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-body">{blog.body}</p>
            <button className="read-more-btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
