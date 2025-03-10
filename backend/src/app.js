const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require("cors");

const app = express();

app.use(cors({ origin: "https://codelens1.onrender.com" }));


app.use(express.json());
app.use('/ai',aiRoutes);
app.get('/',(req,res)=>{
    res.send("Hello World");
})


module.exports = app;
