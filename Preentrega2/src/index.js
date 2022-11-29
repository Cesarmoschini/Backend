import 'dotenv/config';
import server from './services/server';
import { initMongoDB } from './databases/database';

const init = async () => {
  await initMongoDB();
  const puerto = process.env.PORT || 8080;

  server.listen(puerto, () => console.log(`Server connection on port ${puerto}`));
};

init();