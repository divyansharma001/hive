import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoute from '../routes/userRoute.js' 
import postRoute from '../routes/postRoute.js' 
import cors from 'cors'

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

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
}); 