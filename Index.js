import express from 'express';
import ServerApp from './Backend/App'
const App = express();
const port = 4000;

App.use(ServerApp)
App.listen(port, () => {
  console.log(`The Server is running on port: ${port}`)
})
