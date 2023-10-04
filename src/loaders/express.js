
import express from 'express'
import bodyParser from 'body-parser';
import viewRouter from "../api/routes/view.js";
import serveStatic from 'serve-static';
import path from 'path'
import {fileURLToPath} from 'url';
const app = express();
app.use(express.static('.')) 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
import apiRouter from "../api/routes/index.js";
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
 }
 app.use(allowCrossDomain);
 const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 app.use(serveStatic(path.join(__dirname,'../../public')))

 app.use("/api/", apiRouter);
 app.use("/", viewRouter);

  app.use((req, res , next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use(((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  }) );

  app.use(((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  }) );


  export default app 
