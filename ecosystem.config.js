module.exports = {
  apps: [
    {
      name: "dva-frontend",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: "/home/fsh/dva-frontend",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
