const { DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email address already exists.'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email!"
                },
                notNull: {
                    msg: `Email can not be empty !`,
                },
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'username  already exists.'
            },
            validate: {
                notNull: {
                    msg: 'Username can not be empty !',
                },
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name can not be empty !"
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password can not be empty !',
                },
            },
        },

        // PROFILE:
        dob: {
            type: DATE,
            allowNull: true

        },

        bio: {
            type: DataTypes.STRING,
            allowNull: true

        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        social_link: {
            type: DataTypes.STRING,
            allowNullL: true
        },

        company: {
            type: DataTypes.STRING,
            allowNull: true
        },

        location: {
            type: DataTypes.STRING,
            allowNull: true
        },

        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    return Users;
};
