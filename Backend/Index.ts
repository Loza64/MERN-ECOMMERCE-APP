import express from 'express'
const App = express()
App.use(express.json())
const port = 4000
App.listen(port, () =>{
  console.log(`The ECommerce´s server is runing on port ${port}`);
})