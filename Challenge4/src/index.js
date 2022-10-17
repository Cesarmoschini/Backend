const sever = require('./services/server')

const PORT = 8080;
sever.listen(PORT, () => {
	console.log(`Servidor se está escuchando en el puerto ${PORT}`);
})