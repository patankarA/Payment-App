
module.exports = {
    JWT_SECRET: "your-jwt-secret"
}

module.exports = {
    development: {
      username: 'root',      // MySQL username (default is 'root')
      password: 'Akshay@1234', // MySQL password (use your actual password)
      database: 'paymentapp', // Replace with your database name
      host: 'localhost',     // MySQL host (usually localhost or 127.0.0.1)
      dialect: 'mysql',      // Database dialect (for MySQL, it will be 'mysql')
      port: 3306,            // Default MySQL port
      logging: false,        // Disable logging to avoid clutter
    },
    test: {
      username: 'root',
      password: 'Akshay@1234',
      database: 'paymentapp',
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false,
    },
    production: {
      username: 'root',
      password: 'Akshay@1234',
      database: 'paymentapp',
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false,
    }
  };

