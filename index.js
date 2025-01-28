const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const expressOasGenerator = require('express-oas-generator')
const dotenv = require("dotenv");
const errorMiddleware = require('./middleware/errorHandler');
const swaggerUIPath= require("swagger-ui-express");
const swaggerjsonFilePath = require("./swagger.json");
//const bookRoutes = require('./routers/bookRoutes').default;
//const db = require("./model");
dotenv.config();

//swagger
//expressOasGenerator.init(app, {});
const port = 3001
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });
var routes = require('./routers/userRoutes');
var aRoutes = require('./routers/axiosRoutes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app); 
aRoutes(app);
app.use(errorMiddleware);
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})