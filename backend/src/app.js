const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require("cors");

const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: "https://codelens1.onrender.com", // Replace with your frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If you're using cookies or sessions
  })
);

app.use(express.json());
app.use('/ai',aiRoutes);
app.get('/',(req,res)=>{
    res.send("Hello World");
})


module.exports = app;
