require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose')
const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());
 
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