const admin = true;

const validarAdmin = (req, res, next) => {
  if (admin) next();
  else res.status(401).json({ msg: 'Desautorizado' });
};

module.exports = {
  validarAdmin,
};