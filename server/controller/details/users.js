const { token } = require("morgan");
const db = require("../../models");
const { generateAccessToken, checkAccessToken } = require("../tokenFunction");

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
    const { email } = tokenData;
    const { password } = req.body;
    const userData = await db.User.findOne({ where: { email } });
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
    const { email } = tokenData;
    const { password } = req.body;
    const userData = await db.User.update({ password }, { where: { email } });
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
};
