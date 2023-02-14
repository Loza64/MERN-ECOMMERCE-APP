const express = require('express');
const ServerApp = require('./Backend/App')
const { PORT } = require('./Backend/Config')
const App = express();

App.use(ServerApp)
App.listen(PORT, () => console.log(`The Server is running on port: ${PORT}`))

