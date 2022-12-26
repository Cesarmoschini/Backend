//Challenge6
const Config = require('./config');
const serverApp = require('./services/server');

serverApp.listen(Config.port, () => console.log('Puerto escuchándose'));