const express = require('express');
const ServerApp = require('./Backend/App')
const {Port} = require('./Backend/Config')
const App = express();

App.use(ServerApp)
App.listen(Port, () => {
  console.log(`The Server is running on port: ${Port}`)
})
