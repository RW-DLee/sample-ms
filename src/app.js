import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// routes
import indexRouter from './routes/index.js';
import carsRouter from './routes/cars.js';

const app = express();

//middleware
app.enable('trust proxy');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router middleware
app.use('/', indexRouter);
app.use('/cars', carsRouter);

// 404 error
app.use((req, res) => {
  res.status(404);
  res.sendStatus(404);
})

// 500 error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.sendStatus(500);
})

// run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Express server started on port:", PORT);
})

export default app;