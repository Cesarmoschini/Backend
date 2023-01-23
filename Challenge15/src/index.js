import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import Server from './services/server';

const argumentos = minimist(process.argv.slice(2));
export const PORT = process.env.PORT || 8080;

const clusterMode = argumentos.cluster;

const numCPUs = os.cpus().length;

if (clusterMode && cluster.isMaster) {
  console.log('Ejecutando modo cluster');
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {

  Server.listen(PORT, () =>
    console.log(
      `Servidor express corriendo en el puerto ${PORT} - PID WORKER ${process.pid}`
    )
  );
}