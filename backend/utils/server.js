import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoute from '../routes/userRoute.js' 

dotenv.config({
    path:".env"
})

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
}); 