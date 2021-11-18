const db = require("../models");

module.exports = {
  isExistSnsId: async (type, sns_id) => {
    try {
      const result = await db.Social_Login.findOne({
        where: { type, sns_id },
      });
      // console.log(result.dataValues);
      if (result.dataValues.id) {
        return result.dataValues.id;
      } else {
        throw new Error();
      }
    } catch (err) {
      return false;
    }
  },

  snsSignUp: async ({ email, sns_id, type }) => {
    const transaction = await db.sequelize.transaction();
    try {
      if (email) {
        try {
          const user = await db.User.create(
            { email },
            { transaction }
          );
          //console.log(user.dataValues);
          const social_login = await db.Social_Login.create(
            { type, sns_id, userId: user.dataValues.id },
            { transaction }
          );
          transaction.commit();
          const userData = {
            userId: user.dataValues.id,
            email: user.dataValues.email,
          };
          return userData;
        } catch (error) {
          console.log(error);
          transaction.rollback();
          return false;
        }
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
