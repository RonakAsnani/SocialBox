const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "fvffvdfav",
  db: "socialbox_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "******@gmail.com",
      pass: "*********",
    },
  },
  google_client_id: process.env.SOCIALBOX_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.SOCIALBOX_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.SOCIALBOX_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.SOCIALBOX_JWT_SECRET,
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.SOCIALBOX_ASSET_PATH,
  session_cookie_key: process.env.SOCIALBOX_SESSION_COOKIE_KEY,
  db: process.env.SOCIALBOX_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "******@gmail.com",
      pass: "*********",
    },
  },
  google_client_id: process.env.SOCIALBOX_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.SOCIALBOX_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.SOCIALBOX_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.SOCIALBOX_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports = development;
// eval(process.env.SOCIALBOX_ENVIRONMENT) == undefined
//   ? development
//   : eval(process.env.SOCIALBOX_ENVIRONMENT);
