import app from './app';
import './db/mongoose';

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
