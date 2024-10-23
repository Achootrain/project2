const { DataTypes, DATE } = require("sequelize");
const { sequelize } = require(".");
const { Users } = require('./users')

module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define('Projects', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `Project's name can not be empty !`
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        startDate: {
            type: DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: `Project's start date can not be empty !`
                }
            }
        },
        endDate: {
            type: DATE,
            allowNull: true
        },
        leaderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            }

        },
        projectType: {
            type: DataTypes.ENUM('public', 'private'),
            allowNull: false,
            defaultValue: 'private',
            validate: {
                notNull: {
                    msg: `Project's type can not be empty!`
                }
            }
        }
    });
    return Projects;
}