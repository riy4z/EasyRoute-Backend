// config.js

const config = {
  database: {
    url: 'mongodb+srv://easyroute:mffMzdtao4M2uIEg@cluster0.xdo4eov.mongodb.net/Accounts?retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cors: {
    allowedOrigins: ['*'], // Allow any origin
    optionsSuccessStatus: 200,
  },
  bodyParser: {
    json: { limit: '50mb' },
    urlencoded: { limit: '50mb', extended: true },
  },
  server: {
    port: process.env.PORT || 4000,
  },
};

export default config;