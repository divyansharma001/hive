import express from 'express';
import cookieParser from 'cookie-parser';
import userRoute from '../routes/userRoute.js' 
import postRoute from '../routes/postRoute.js' 
import cors from 'cors'


const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}

app.use(cors(corsOptions))

app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
}); 