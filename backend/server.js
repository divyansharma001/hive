import express from 'express';
 
const app = express();

app.get('/', (req, res)=>{
    res.send('The backend server is running')
})


app.listen(3000);