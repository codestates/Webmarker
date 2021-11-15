const { checkAccessToken } = require("../tokenFunction");
const { Folder, Bookmark, Tag, Bookmarks_Folder, Bookmarks_Tag } = require("../../models");

module.exports = {
  allBookmarks: (req, res) => {
    res.status(200).send("it's bookmarksRouter");
  },
  addBookmark: async (req, res) => { //북마크 추가하는 기능

  },
  updateBookmark: async (req, res) => { // 북마크의 내용 수정하는 기능
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "유효하지 않는 토큰입니다.",
      });
    // 요청을 제대로 하였는가?
    const { id, title, url, content, tagId, tagName, folderId, folderName } = req.body;
    if (!id) res.status(400).json({ data: null, message: "잘못된 요청입니다" });
    try {
      // 요청에 따른 데이터 수정있다면
      const bookmarkData;
      if (title && url && content) { // 타이틀, url, 콘텐츠 수정 요청이 있다면
        bookmarkData = await Bookmark.update({ title, url, content }, { where: { id } });
      } else if (title && url) {
        bookmarkData = await Bookmark.update({ title, url }, { where: { id } });
      } else if (title && content) {
        bookmarkData = await Bookmark.update({ title, content }, { where: { id } });
      } else if (url && content) {
        bookmarkData = await Bookmark.update({ url, content }, { where: { id } });
      } else if (url) {
        bookmarkData = await Bookmark.update({ url }, { where: { id } });
      } else if (content) {
        bookmarkData = await Bookmark.update({ content }, { where: { id } });
      } else {
        bookmarkData = await Bookmark.updata({ title }, { where: { id } });
      }
      
      const tagData = await Tag.update({ name: tagName }, { where: { id: tagId } });

      res.status(201).json({
        data: {
          bookmark:
          {
            id: bookmarkData.dataValues.id,
            title: bookmarkData.dataValues.title,
            content: bookmarkData.dataValues.content,
            url: bookmarkData.dataValues.url
          },
          tag: { id: tagData.dataValues.id, name: tagData.dataValues.name}
        }, message: "Succeed to update a bookmark"
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  },
  moveBookmark: async (req, res) => { // 북마크 이동하는 기능
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData) {
      res.status(401).json({
        data: null,
        message: "유효하지 않는 토큰입니다.",
      });
    }
    // 요청을 제대로 하였는가?
    const { id } = req.params;
    const { folderId } = req.body;
    if (!id || !folderId) res.status(400).json({ data: null, message: "잘못된 요청입니다" });
    try {
      const result = await Bookmarks_Folder.update({ folderId }, { where: { bookmarkId: id } });
      res.status(201).json({
        data:
        {
          folderId: result.dataValues.folderId,
          bookmarkId: result.dataValues.bookmarkId
        },
        message: "북마크를 이동했습니다."
      })
    } catch (err) {
      res.status(500).json({data: null, message: err});
    }
  },
  deleteBookmark: (req, res) => { // 북마크 삭제하는 기능
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "유효하지 않는 토큰입니다.",
      });
    // 요청을 제대로 하였는가?
    const { id } = req.body;
    if (!id) res.status(400).json({ data: null, message: "잘못된 요청입니다" });

    // 해당하는 북마크 아이디의 데이터 삭제(북마크 테이블, 북마크_폴더, 북마크_테그 테이블 데이터 삭제됨)
    Bookmark.destroy({
      where: id,
    })
      .then((data) => {
        Tag.destroy({
          where: {
            id: {
              [sequelize.Op.not]: [sequelize.literal(`select tagId from Bookmarks_Tags`)],
            },
          },
        });
      })
      .then((result) => {
        res.status(200).json({
          data: null,
          message: "Succeed to delete a bookmark",
        });
      })
      .catch((err) => res.status(500).send(err)); // 남은 태크 테이블 데이터도 삭제
  },
};
