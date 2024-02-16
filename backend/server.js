//server.js
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ui', 'html'));

app.use(express.static(path.join(__dirname, 'static')));

 
app.use('/auth', userRouter);



const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://anelya:bam_0708@cluster0.6t7kekq.mongodb.net/`)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  }
  catch (e) {
    console.log(e)
  }

}

start()
