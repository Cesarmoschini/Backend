const configPort = () => {
    port = 8080 || process.env.PORT
}

const admin = ()=>{
    administrator= true
}

module.exports = {
    admin,
    configPort,
  };