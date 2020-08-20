"use strict";
module.exports = (sequelize, DataTypes) => {
  const checkout = sequelize.define(
    "checkout",
    {
      image: DataTypes.STRING,
      notes: DataTypes.STRING,
      status: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
    },
    { underscored: true }
  );
  checkout.associate = function (models) {
    // associations can be defined here
  };
  return checkout;
};
