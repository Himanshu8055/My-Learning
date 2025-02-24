import express from 'express';

const app = express();


const PORT = process.env.PORT || 4000;

app.get('/',(req,res)=>{
  res.send('Himanshu');
})

// app.get('')

app.get('/home', ()=>{
  
})

app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
})