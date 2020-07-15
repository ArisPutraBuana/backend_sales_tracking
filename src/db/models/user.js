"use strict";
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      nik: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    { underscored: true }
  );
  User.associate = function (models) {
    // associations can be defined here
  };

  User.beforeCreate((user, _) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.prototype.checkPassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
  };

  User.prototype.generateAuthToken = (user) => {
    const token = sign(
      {
        user: {
          id: user.id,
          username: user.username,
          status: user.status,
          role: user.role,
        },
      },
      "secret"
    );
    return token;
  };

  return User;
};
