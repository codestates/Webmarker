const dotenv = require("dotenv");
const axios = require("axios");
const { token } = require("morgan");
const db = require("../../models");
const {
  generateAccessToken,
  checkAccessToken,
  generateRefreshToken,
  checkRefreshToken,
} = require("../tokenFunction");
const { isExistSnsId, snsSignUp } = require("../oauthFunction");

dotenv.config();

const GOOGLE_AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_AUTH_REDIRECT_URL =
  "https://server.webmarker.link/users/auth/google/callback";

module.exports = {
  test: (req, res) => {
    res.status(200).send("it's usersRouter");
  },
  // 회원가입
  signup: async (req, res) => {
    const { email, password } = req.body;
    const data = await db.User.findOne({ where: { email } });

    if (!data) {
      const newUser = await db.User.create({ email, password });
      delete newUser.dataValues.id;
      delete newUser.dataValues.password;
      res.status(201).send({
        newUser,
        message: "ok",
      });
    } else {
      res.status(409).send({
        data: null,
        message: "이메일 주소가 존재합니다",
      });
    }
  },
  // 로그인
  login: async (req, res) => {
    const { email, password } = req.body;
    const data = await db.User.findOne({ where: { email } });
    if (!data) {
      res.status(401).send({
        data: null,
        message: "존재하지 않는 사용자 정보입니다",
      });
    } else if (data.dataValues.password !== password) {
      res.status(401).send({
        data: null,
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      const { id, email, createAt } = data.dataValues;
      tokenData = {
        id,
        email,
        createAt,
      };
      const accessToken = generateAccessToken(tokenData);
      res.status(200).send({
        data: {
          accessToken,
        },
        message: "ok",
      });
    }
  },
  // 사용자 정보 userInfo
  userInfo: async (req, res) => {
    const data = checkAccessToken(req);
    if (!data) {
      res.status(401).send({
        data: null,
        message: "잘못된 토큰 정보입니다",
      });
    } else {
      res.status(200).send({
        data,
        message: "ok",
      });
    }
  },
  // 비밀번호 확인
  checkPassword: async (req, res) => {
    const tokenData = checkAccessToken(req);
    const { id } = tokenData;
    const password = req.params.id;
    console.log(password);
    const userData = await db.User.findOne({ where: { id } });
    if (userData.dataValues.password === password) {
      res.status(200).send({
        data: {
          result: true,
        },
        message: "password checked",
      });
    } else {
      res.status(200).send({
        data: {
          result: false,
        },
        message: "password checked",
      });
    }
  },
  // 비밀번호 갱신
  updatePassword: async (req, res) => {
    const tokenData = checkAccessToken(req);
    const { id } = tokenData;
    const { password } = req.body;
    const userData = await db.User.update(
      { password },
      { where: { id } }
    );
    console.log(userData);
    if (!userData) {
      res.status(400).send({
        data: null,
        message:
          "비밀번호 변경에 에러가 발생되었습니다 정보를 다시 확인해주세요",
      });
    } else {
      res.status(200).send({
        data: null,
        message: "password has been changed",
      });
    }
  },
  // 회원탈퇴 API
  withdrawal: async (req, res) => {
    const tokenData = checkAccessToken(req);
    if (!tokenData) {
      res.status(400).send({
        data: null,
        message: "토큰의 데이터가 확인되지 않습니다",
      });
    } else {
      const { id } = tokenData;
      await db.User.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({
        data: null,
        message: "Membership withdrawal has been completed",
      });
    }
  },

  // 구글 oauth 연결
  google: (req, res) => {
    return res.redirect(
      `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`
    );
  },
  // 구글 oauth 콜백
  googleCallback: async (req, res) => {
    const { code } = req.query;
    try {
      const { data } = await axios({
        method: "POST",
        url: `${GOOGLE_AUTH_TOKEN_URL}`,
        headers: {
          "content-type":
            "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          grant_type: "authorization_code", //특정 스트링
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_SECRET_ID,
          redirect_uri: GOOGLE_AUTH_REDIRECT_URL,
          code: code,
        },
      });
      const access_token = data.access_token;
      const { data: me } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { sub, email, name } = me;
      const userInfo = {
        email,
        sns_id: sub,
        type: "google",
      };
      const userId = await isExistSnsId(
        userInfo.type,
        userInfo.sns_id
      );

      let accessToken;
      if (userId) {
        refreshToken = generateRefreshToken({
          id: userId,
          email,
        });
      } else {
        const signUpGoogle = await snsSignUp(userInfo);
        refreshToken = generateRefreshToken(signUpGoogle);
      }
      res
        .cookie("refreshToken", refreshToken, {
          domain: "webmarker.link",
          httpOnly: true,
        })
        .redirect("http://webmarker.link");
    } catch (err) {
      res
        .status(500)
        .json({ data: null, message: "internal server err" });
    }
  },
  // refreshToken -> accessToken 클라이언트에 전달
  sendToken: (req, res) => {
    const { refreshToken } = req.cookies;
    try {
      const tokenData = checkRefreshToken(refreshToken);

      if (tokenData) {
        const accessToken = generateAccessToken(tokenData);
        res.status(200).send({
          data: {
            accessToken,
          },
          message: "ok",
        });
      } else {
        res.status(401).send({
          data: null,
          message: "잘못된 토큰 정보입니다",
        });
      }
    } catch (err) {
      res.status(500).send({ data: null, message: err });
    }
  },
};
