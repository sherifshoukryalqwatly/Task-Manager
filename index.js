const express = require('express');

const app = express();

require('dotenv').config();

const mongoose =require('mongoose');

mongoose.connect(process.env.DB);

const cors = require('cors');


const userRouter = require('./routes/user.route.js');
const taskRouter = require('./routes/task.route.js');
const auth = require('./middelwares/authintication.js');

app.use(express.json());
app.use(cors());

app.use('/users',userRouter);
app.use('/tasks',auth,taskRouter);


try {
    app.listen(process.env.PORT,()=>{
    console.log("Server is Run on Port :",process.env.PORT);
});
} catch (error) {
    console.log("Server Down");
}
