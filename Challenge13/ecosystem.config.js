module.exports = {
    apps: [
      {
        name: 'app1',
        script: 'dist/index.js',
        watch: true,
        autorestart: true,
        args: '--puerto=8080',
      },
      {
        name: 'app2',
        script: 'dist/index.js',
        watch: true,
        autorestart: true,
        args: '--puerto=8081',
      },
      {
        script: './service-worker/',
        watch: ['./service-worker'],
      },
    ],
  };