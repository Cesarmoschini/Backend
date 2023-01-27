import Config from './config';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import Server from './services/server';

const argumentos = minimist(process.argv.slice(2));

const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;


if (clusterMode && cluster.isMaster) {
  console.log('Ejecutando modo cluster');
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} finaliza al día ${Date()}`);
    cluster.fork();
  });
} else {
  /* --------------------------------------------------------------------------- */
  /* WORKERS */
  Server.listen(Config.PORT, () =>
    console.log(
      `Servidor express corriéndose en el puerto ${Config.PORT} - PID WORKER ${process.pid}`
    )
  );
}