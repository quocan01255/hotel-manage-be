import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import indexRouter from './routes/index';

// import kuromoji from 'kuromoji';

const app = express();

app.use('/static', express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use('/v1', indexRouter);

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
