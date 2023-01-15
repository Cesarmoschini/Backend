import Server from './services/server';

const PORT = 8080;

Server.listen(PORT, () =>
  console.log(
    `Servidor express corriéndose en el puerto ${PORT} - PID WORKER ${process.pid}`
  )
);