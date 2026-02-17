module.exports = {
  apps: [
    {
      name: "dva-frontend",
      script: "npm",
      args: "start",
      cwd: "/home/fsh/dva-frontend",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
