'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      }
    }
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    List.hasMany(models.Task, {
      foreignKey: 'listId',
      onDelete: 'cascade',
      hooks: true
    })
  };
  return List;
};
