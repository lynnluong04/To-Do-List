'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lists'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,256]
      }
    },
    completionStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.List, {
      foreignKey: 'listId'
    })
  };
  return Task;
};
