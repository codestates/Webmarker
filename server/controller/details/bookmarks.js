const { checkAccessToken } = require("../tokenFunction");
const {
  User,
  Folder,
  Bookmark,
  Tag,
  Bookmarks_Folder,
  Bookmarks_Tag,
} = require("../../models");

module.exports = {
  allBookmarks: async (req, res) => {
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "unauthorized token",
      });
    const { id } = tokenData;

    // 유저가 가지고 있는 폴더 정보 조회
    try {
      const result = await Folder.findAll({
        attributes: ["id", "name", "userId"], // 해당 필드만 보이게
        include: [
          {
            model: Bookmark,
            as: "Bookmarks",
            through: { attributes: [] }, // Bookmarks_Folders테이블의 정보 출력 X
            include: [
              {
                model: Tag,
                as: "Tags",
                through: { attributes: [] }, // Bookmarks_Tags 테이블 정보 출력 X
              },
            ],
          },
        ],
        where: { userId: id },
        order: [["userId", "ASC"]], // Folder 테이블의 userId의 오름차순 정렬
        row: true, // defaultValues만 출력
      });

      res.status(200).json({
        data: { folders: result },
        message:
          "Succeed Getting User's Bookmark Information",
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        message: "internal server error",
      });
    }
  },
  addBookmark: async (req, res) => {
    //북마크 추가하는 기능
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "unauthorized token",
      });
    const { id } = tokenData;
    // 요청이 제대로 왔는가?
    const { name, url, content, tag, folderId } = req.body;
    try {
      if (name && url && content && folderId) {
        const bookmarkData = await Bookmark.create({
          name,
          url,
          content,
        });
        const bookmarksFolders =
          await Bookmarks_Folder.create({
            folderId,
            bookmarkId: bookmarkData.dataValues.id,
          });
        // console.log(bookmarksFolders);
        if (!!tag) {
          tag.forEach(async (item) => {
            // console.log("item: " + item);
            let tagData = await Tag.create({ name: item });
            let bookmarksTags = await Bookmarks_Tag.create({
              bookmarkId: bookmarkData.dataValues.id,
              tagId: tagData.dataValues.id,
            });
          });
        }

        res.status(201).json({
          data: null,
          message: "bookmark added!",
        });
      } else {
        res
          .status(400)
          .json({ data: null, message: "bad request" });
      }
    } catch (err) {
      res.status(500).json({
        data: null,
        message: "internal server error",
      });
    }
  },
  updateBookmark: async (req, res) => {
    // 북마크의 내용 수정하는 기능
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "unauthorized token",
      });
    console.log("tokenData: " + tokenData);
    // 요청을 제대로 하였는가?
    // id는 bookmarkId

    if (!req.body.id) {
      res
        .status(400)
        .json({ data: null, message: "bad request" });
    }

    const bookmarkObj = Object.assign({}, req.body);
    let tags;
    if (bookmarkObj.tag) {
      tags = bookmarkObj.tag.slice();
      delete bookmarkObj.tag;
    }

    try {
      for (let key in bookmarkObj) {
        if (key === "id") {
          continue;
        } else if (key === "name") {
          await Bookmark.update(
            { name: bookmarkObj.name },
            { where: { id: bookmarkObj.id } }
          );
        } else if (key === "url") {
          await Bookmark.update(
            { url: bookmarkObj.url },
            { where: { id: bookmarkObj.id } }
          );
        } else if (key === "content") {
          await Bookmark.update(
            { content: bookmarkObj.content },
            { where: { id: bookmarkObj.id } }
          );
        }
      }

      if (!!tags) {
        for (let el of tags) {
          if (el.delete) {
            await Tag.destroy({ where: { id: el.id } });
          } else {
            const newTag = await Tag.create({
              name: el.name,
            });
            await Bookmarks_Tag.create({
              bookmarkId: bookmarkObj.id,
              tagId: newTag.dataValues.id,
            });
          }
        }
      }

      res.status(201).send({
        data: null,
        message: "Succeed to update a bookmark",
      });
    } catch (err) {
      res.status(500).send({
        data: null,
        message: "internal server error",
      });
    }
  },
  moveBookmark: async (req, res) => {
    // 북마크 이동하는 기능(기존에 있는 folderId, bookmarkId, 이동할 folderId 필요)
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData) {
      res.status(401).json({
        data: null,
        message: "unauthorized token",
      });
    }
    // 요청을 제대로 하였는가?
    const { id } = req.params;
    const { folderId } = req.body;
    if (!id || !folderId)
      res
        .status(400)
        .json({ data: null, message: "bad request" });
    try {
      const result = await Bookmarks_Folder.update(
        { folderId },
        { where: { bookmarkId: id } }
      );
      res.status(201).json({
        data: { folderId, bookmarkId: id },
        message: "Succeed to move a bookmark",
      });
    } catch (err) {
      res.status(500).json({
        data: null,
        message: "internal server error",
      });
    }
  },
  deleteBookmark: async (req, res) => {
    // 북마크 삭제하는 기능
    // 인증된 유저인가?
    const tokenData = checkAccessToken(req);
    if (!tokenData)
      res.status(401).json({
        data: null,
        message: "unauthorized token",
      });
    // 요청을 제대로 하였는가?
    const { id } = req.params; // id는 bookmarkId
    // console.log(id);
    if (!id)
      res
        .status(400)
        .json({ data: null, message: "bad request" });

    // 해당하는 북마크 아이디의 데이터 삭제
    try {
      const result = await Bookmark.destroy({
        where: { id },
      });

      res.status(200).json({
        data: null,
        message: "Succeed to delete a bookmark",
      });
    } catch (err) {
      //console.log(err);
      res.status(500).send("internal server error");
    }
  },
};
