'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResourceFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResourceFile.init({
    resourceId: DataTypes.INTEGER,
    filePath: DataTypes.STRING,
    index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ResourceFile',
  });
  return ResourceFile;
};