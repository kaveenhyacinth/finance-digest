module.exports = {
  apps: [
    {
      name: "finance-digest-backend",
      script: "npm",
      args: "run start",
      cwd: "/var/www/finance-digest/api",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "3G",
      env: {
        NODE_ENV: "production",
        PORT: 8088
      },
      error_file: "/home/ec2-user/.pm2/logs/finance-digest-backend-error.log",
      out_file: "/home/ec2-user/.pm2/logs/finance-digest-backend-out.log"
    },
    {
      name: "finance-digest-frontend",
      script: "npm",
      args: "run start",
      cwd: "/var/www/finance-digest/client",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "3G",
      env: {
        NODE_ENV: "production",
        PORT: 5088
      },
      error_file: "/home/ec2-user/.pm2/logs/finance-digest-frontend-error.log",
      out_file: "/home/ec2-user/.pm2/logs/finance-digest-frontend-out.log"
    }
  ]
};
