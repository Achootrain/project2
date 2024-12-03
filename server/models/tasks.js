module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
 
    priority: {
      type: DataTypes.ENUM("1", "2", "3"),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }
  ,
  {timestamps: false,
      createdAt: false,
      updatedAt: false,
    }

);


  // Association ===========================author: Hai
  Tasks.associate = function (models) {
    Tasks.hasMany(models["TaskComments"], {
      foreignKey: 'task_id',
    });
    Tasks.hasMany(models["AssignedTos"], {
      foreignKey: 'task_id'
    });
    Tasks.hasMany(models["Reports"], {
      foreignKey: "task_id"
    })
    Tasks.belongsTo(models["Projects"], {
      foreignKey: "project_id",
       onDelete: 'CASCADE'
    })
  }
  //===================================================
  return Tasks;
};
