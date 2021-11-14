const { checkAccessToken } = require("../tokenFunction");
const { Folder } = require("../../models");

module.exports = {
  test: (req, res) => {
    res.status(200).send("it's foldersRouter");
  },
  createFolder: async (req, res) => {
    // 첫번째 바디로 정확한 데이터를 보냈는가?
    const { name } = req.body;
    if (!name)
      res.status(400).json({
        data: null,
        message: "잘못된 요청입니다",
      });
    // 두번째 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "유효하지 않는 토큰입니다.",
      });

    // 제대로 요청을 보냈고 인증된 유저면 폴더를 DB에 저장한다.
    const { userId } = tokenData;
    try {
      const folderData = await Folder.create({
        userId,
        name,
      });

      const { id, name, userId } = folderData.dataValues;
      res.status(201).json({
        data: { id, name, userId },
        message: "Succeed to create new folder",
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  },
  updateFolderName: async (req, res) => {
    // 첫번째 바디로 정확한 데이터를 보냈는가?
    const { id, name } = req.body;
    if (!name || !id)
      res.status(400).json({
        data: null,
        message: "잘못된 요청입니다",
      });
    // 두번째 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "유효하지 않는 토큰입니다.",
      });
    const { userId } = tokenData;
    try {
      // id와 userId가 보내온 요청에 맞는 데이터만 폴더명 수정
      const data = await Folder.update({ name }, { where: { id, userId } });
      const { id, name, userId } = data.dataValues;
      res.stauts(201).json({
        data: { id, name, userId },
        message: "Succeed to update a folder",
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteFolder: async (req, res) => {
    // 첫번째 바디로 정확한 데이터를 보냈는가?
    const { id } = req.body;
    if (!id)
      res.status(400).json({
        data: null,
        message: "잘못된 요청입니다",
      });
    // 두번째 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "유효하지 않는 토큰입니다.",
      });
    try {
      // 해당하는 폴더 아이디의 데이터 삭제
      const result = await Folder.destroy({
        where: id,
      });
      res.status(200).json({
        data: null,
        message: "Succeed to delete a folder",
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
