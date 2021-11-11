require("dotenv").config();
const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

module.exports = {
  // @param data: 반드시 객체 유형으로 매개변수 입력
  // * accessToken 생성 함수
  generateAccessToken: (data) => {
    return jwt.sign(data, ACCESS_SECRET, { expiresIn: "1d" });
  },
  // * refreshToken 생성 함수
  generateRefreshToken: (data) => {
    return jwt.sign(data, REFRESH_SECRET, { expiresIn: "30d" });
  },
  // * accessToken 내용물 변환 함수
  checkAccessToken: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const accessToken = authorization.split(" ")[1];
    try {
      return jwt.verify(accessToken, ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  // * refreshToken 내용물 변환 함수
  checkRefreshToken: (req) => {
    const refreshToken = req.cookies.refreshToken;
    try {
      return jwt.verify(refreshToken, REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
