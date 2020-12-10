const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const HttpError = require('./models/HttpError');
const connectDB = require('./config/db');
const connectSocket = require('./socket')

// @desc init app
const app = express();

// @desc middlewares config
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

// @desc Access api control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept, Authorization');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// @desc api routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/questions', require('./routes/question'));
app.use('/api/v1/game', require('./routes/game'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/kahoot', require('./routes/kahoot'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

// @desc 404 routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

// @desc errors occur
app.use((error, req, res, next) => {
  if (res.headerSent)
  {
    return next(error);
  }
  return res.status(error.code || 500).json({ message: error.message || 'Unknown Error Occur' });
});

// @desc connect to db & run server

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));


connectSocket()