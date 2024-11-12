module.exports = (sequelize, DataTypes) => {
    const JoinRequests = sequelize.define("JoinRequests", {
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

        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Projects",
                key: "id",
            },
        },

        isAccept: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    }, { timestamps: false, createdAt: false, updatedAt: false })

    // Association =========================================
    JoinRequests.associate = function (models) {
        JoinRequests.belongsTo(models['Projects'], {
            foreignKey: 'project_id',
            onDelete: 'CASCADE'
        }),
            JoinRequests.belongsTo(models['Users'], {
                foreignKey: 'user_id'
            })
    }
    // =====================================================


    return JoinRequests;
}
