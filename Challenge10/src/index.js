import Server from './services/server';

const PORT = 8080;
Server.listen(PORT, () => {
  console.log(`Server up puerto ${PORT}`);
});