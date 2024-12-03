module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define("Reports", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tasks",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }
  ,
  {timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
);

  // Association ============================ author: Hai
  Reports.associate = (models) => {
    Reports.belongsTo(models["Tasks"], {
      foreignKey: 'task_id',
      onDelete: 'CASCADE'
    });
    // ====================================================
    Reports.belongsTo(models["Users"], {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return Reports;
};
