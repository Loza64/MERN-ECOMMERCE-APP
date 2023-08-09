import express from 'express';
import ServerApp from'./Backend/App.js'
import { PORT } from './Backend/Config.js'
const App = express();

App.use(ServerApp)
App.listen(PORT, () => console.log(`The Server is running on port: ${PORT}`))