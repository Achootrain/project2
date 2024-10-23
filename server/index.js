const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());// parse the data sent by client in json format
const cors = require('cors');
app.use(cors());


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});

const userRouter = require('./routes/users')
app.use('/api/users', userRouter)