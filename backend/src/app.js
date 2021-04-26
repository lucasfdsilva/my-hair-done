const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
require('dotenv').config()

//const NewBookingQueuePollingService = require('./services/NewBookingQueuePollingService');

var swaggerOptions = {
  customSiteTitle: "My Hair Done API",
  customfavIcon: "/assets/favicon.ico"
}


//Configuring Express Server
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(routes.openRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;