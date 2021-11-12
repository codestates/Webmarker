require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const express = require("express");
const indexRouter = require("./router");
const app = express();

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

// * 기본 기능 테스팅
app.get("/", (req, res) => {
  res.status(200).send("hello!");
});

// * router 연결
app.use("/", indexRouter);

// ! 아래는 토큰 관련 함수를 테스트하기 위한 라우트 ~ @end 까지
// 아래 코드는 추후 재활용 또는 폐기 하도록 하겠습니다.
// const {
//   generateAccessToken,
//   checkAccessToken,
//   generateRefreshToken,
//   checkRefreshToken,
// } = require("./controller/tokenFunction");

// app.post("/takeToken", (req, res) => {
//   const data = req.body;
//   const accessToken = generateAccessToken(data);
//   const refreshToken = generateRefreshToken(data);
//   res
//     .status(201)
//     .cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 60 * 60 * 24 * 7, // 최대 기간 : 1주일 설정
//     })
//     .send({ data: { accessToken }, message: "ok" });
// });
// app.get("/takeToken", (req, res) => {
//   const result = checkAccessToken(req);
//   const refresh = checkRefreshToken(req);
//   res.status(200).send({ A: result, B: refresh });
// });

// !@end 여기서 테스트 기능 종료

// * 서버 listen 코드
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
