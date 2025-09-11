const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/user.route")
const blogRoute = require("./routes/blog.route");
const commentRoute = require("./routes/comment.route");
const fileUpload = require('express-fileupload');

const {phone} = require('phone');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({
  origin: 'http://localhost:5173', // 👈 exact frontend origin
  credentials: true, // allow sending cookies/tokens
}));


// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// routes
app.use("/user",userRoute)

app.use("/blog",blogRoute)

app.use("/comment",commentRoute)

app.get('/phone',(req,res)=>{
  const phones = phone('+91 9512959171', {country: 'india'}); 
  return res.json({phones})
})

// Connect MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("MongoDB connection error:", err);
});
