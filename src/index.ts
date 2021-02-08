import app from './app';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL || '', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () =>
  console.info(
    `Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.db.databaseName}`,
  ),
);
mongoose.connection.on('close', () => console.info('connection closed'));
mongoose.connection.on('error', err => console.error('connection error %s', err));

const port = process.env.PORT;

app.listen(port || 5000, () => {
  console.log('Server is up on port ' + port);
});
