require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");

const express = require("express");
const app = express();

const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("hello!");
});

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => {
    console.log(`
    HTTPS Server is listening on port :${HTTPS_PORT}
  `);
  });
} else {
  server = app.listen(HTTP_PORT, () => {
    console.log(`HTTP Server is listening on port :${HTTP_PORT}`);
  });
}

module.exports = server;
