const express = require("express");
const app = express();
require("dotenv").config()


/* Production */
if (process.env.NODE_ENV === "production") {
  app.use( express.static("./client/build/") )
  app.get("/", (req, res) => res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html"))
  )
}


/* Middleware */
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
app.use( express.urlencoded({extended : true}) )
app.use( express.json() )
app.use( logger('dev') )
app.use( helmet() )
app.use( cors() )


/* API Routes */
const urlRoutes = require("./routers/url-route.js");
const pageRoutes = require("./routers/page-route.js");
app.use("/url", urlRoutes)
app.use("/", pageRoutes)


/* Error Handling */
const errors = require("./middleware/errors.js");
app.use(errors.pageNotFoundError)
app.use(errors.internalServerError)


/* Server */
const PORT = process.env.PORT || 5050;
app.listen(PORT, _ => console.log(
  `Test Server — http://localhost:${PORT}`
))