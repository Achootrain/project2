module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );

  // Association ===================================
  // ------------------------------------author: Hai
  Posts.associate = function (models) {
    Posts.hasMany(models["PostComments"], {
      foreignKey: 'project_id',
    })
  }
  //------------------------------------------------

  return Posts;
};
