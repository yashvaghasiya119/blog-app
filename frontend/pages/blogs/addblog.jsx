// import React, { useState } from "react";
// import '../style/blogs/addblog.css'


// export function AddBlog() {
//   const [formData, setFormData] = useState({
//     title: "",
//     body: "",
//     hashtags: [],
//     image: null
//   });

//   const [hashtagInput, setHashtagInput] = useState("");
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleHashtagChange = (e) => {
//     setHashtagInput(e.target.value);
//   };

//   const handleAddHashtag = () => {
//     const newTags = hashtagInput
//       .split(",")
//       .map((tag) => tag.trim())
//       .filter((tag) => tag && !formData.hashtags.includes(tag));

//     setFormData({ ...formData, hashtags: [...formData.hashtags, ...newTags] });
//     setHashtagInput("");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file });
//     if (file) setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create FormData to send file
//     const blogData = new FormData();
//     blogData.append("title", formData.title);
//     blogData.append("body", formData.body);
//     blogData.append("image", formData.image);
//     formData.hashtags.forEach((tag, idx) =>
//       blogData.append(`hashtags[${idx}]`, tag)
//     );

//     // Simulate API request
//     console.log("Submitting blog data:", formData);
//     alert("Blog submitted (check console)");
//   };

//   return (
//     <div className="add-blog-container">
//       <form className="add-blog-form" onSubmit={handleSubmit}>
//         <h2>Add New Blog</h2>

//         <div className="form-group">
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Blog title"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Body</label>
//           <textarea
//             name="body"
//             value={formData.body}
//             onChange={handleInputChange}
//             placeholder="Write your blog content here..."
//             rows={5}
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label>Hashtags (comma-separated)</label>
//           <input
//             type="text"
//             value={hashtagInput}
//             onChange={handleHashtagChange}
//             placeholder="#react, #node, #webdev"
//           />
//           <button type="button" onClick={handleAddHashtag} className="add-tag-btn">
//             Add Hashtags
//           </button>
//           <div className="tag-list">
//             {formData.hashtags.map((tag, i) => (
//               <span className="tag" key={i}>
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Image</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} required />
//           {previewImage && (
//             <img src={previewImage} alt="Preview" className="image-preview" />
//           )}
//         </div>

//         <button type="submit" className="submit-btn">Publish Blog</button>
//       </form>
//     </div>
//   );
// }


// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import "../style/blogs/addblog.css";
// import { api } from "../../lib/axios";

// export function AddBlog() {
//   const [formData, setFormData] = useState({
//     title: "",
//     body: "",
//     hashtags: [],
//     image: null,
//   });

//   const [hashtagInput, setHashtagInput] = useState("");
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // ✅ loading state

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleHashtagChange = (e) => {
//     setHashtagInput(e.target.value);
//   };

//   const handleAddHashtag = () => {
//     const newTags = hashtagInput
//       .split(",")
//       .map((tag) => tag.trim())
//       .filter((tag) => tag && !formData.hashtags.includes(tag));

//     setFormData({ ...formData, hashtags: [...formData.hashtags, ...newTags] });
//     setHashtagInput("");
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     setFormData((prev) => ({ ...prev, image: file }));
//     setPreviewImage(URL.createObjectURL(file));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: false,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // ✅ Start loading

//     try {
//       const blogData = new FormData();
//       blogData.append("title", formData.title);
//       blogData.append("body", formData.body);
//       blogData.append("image", formData.image);
//       formData.hashtags.forEach((tag, idx) =>
//         blogData.append(`hashtags[${idx}]`, tag)
//       );

//       // Simulate API delay
//       const response = await api.post("/blog/add", blogData);
//       console.log("🚀 ~ handleSubmit ~ response:", response)
      

//       console.log("Submitting blog data:", formData);
//       alert("Blog submitted (check console)");
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Submission failed!");
//     } finally {
//       setIsLoading(false); // ✅ End loading
//     }
//   };

//   return (
//     <div className="add-blog-container">
//       <form className="add-blog-form" onSubmit={handleSubmit}>
//         <h2>Add New Blog</h2>

//         <div className="form-group">
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Blog title"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Body</label>
//           <textarea
//             name="body"
//             value={formData.body}
//             onChange={handleInputChange}
//             placeholder="Write your blog content here..."
//             rows={5}
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label>Hashtags (comma-separated)</label>
//           <input
//             type="text"
//             value={hashtagInput}
//             onChange={handleHashtagChange}
//             placeholder="#react, #node, #webdev"
//           />
//           <button
//             type="button"
//             onClick={handleAddHashtag}
//             className="add-tag-btn"
//           >
//             Add Hashtags
//           </button>
//           <div className="tag-list">
//             {formData.hashtags.map((tag, i) => (
//               <span className="tag" key={i}>
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Image</label>
//           <div
//             className={`dropzone ${isDragActive ? "active" : ""}`}
//             {...getRootProps()}
//           >
//             <input {...getInputProps()} />
//             {isDragActive ? (
//               <p>Drop the image here...</p>
//             ) : (
//               <p>Drag & drop an image here, or click to select</p>
//             )}
//           </div>
//           {previewImage && (
//             <img
//               src={previewImage}
//               alt="Preview"
//               className="image-preview"
//             />
//           )}
//         </div>

//         <button type="submit" className="submit-btn" disabled={isLoading}>
//           {isLoading ? "Submitting..." : "Publish Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../style/blogs/addblog.css";
import { api } from "../../lib/axios";

export function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    hashtags: [],
    photo: null,
  });

  const [hashtagInput, setHashtagInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHashtagChange = (e) => {
    setHashtagInput(e.target.value);
  };

  const handleAddHashtag = () => {
    const newTags = hashtagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && !formData.hashtags.includes(tag));

    setFormData({ ...formData, hashtags: [...formData.hashtags, ...newTags] });
    setHashtagInput("");
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData((prev) => ({ ...prev, photo: file }));
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("body", formData.body);
      blogData.append("photo", formData.photo);

      // Convert hashtags array to a JSON string
      blogData.append("hashtags", JSON.stringify(formData.hashtags));

      // Send to your backend
      const response = await api.post("/blog/add", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("🚀 ~ Blog submitted successfully:", response.data);

      alert("Blog submitted!");

      // ✅ Reset form (optional)
      setFormData({ title: "", body: "", hashtags: [], photo: null });
      setHashtagInput("");
      setPreviewImage(null);
    } catch (error) {
      console.error("❌ Error submitting blog:", error);
      alert("Blog submission failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-blog-container">
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <h2>Add New Blog</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Blog title"
            required
          />
        </div>

        <div className="form-group">
          <label>Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Write your blog content here..."
            rows={5}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Hashtags (comma-separated)</label>
          <input
            type="text"
            value={hashtagInput}
            onChange={handleHashtagChange}
            placeholder="#react, #node, #webdev"
          />
          <button
            type="button"
            onClick={handleAddHashtag}
            className="add-tag-btn"
          >
            Add Hashtags
          </button>
          <div className="tag-list">
            {formData.hashtags.map((tag, i) => (
              <span className="tag" key={i}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Image</label>
          <div
            className={`dropzone ${isDragActive ? "active" : ""}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & drop an image here, or click to select</p>
            )}
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="image-preview"
              name="photo"
            />
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
