'use strict';
module.exports = function(sequelize, DataTypes) {
  var Urls = sequelize.define('Urls', {
    reference:  {type: DataTypes.STRING, unique: true},
    url: DataTypes.STRING,
    hits: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Urls;
};
