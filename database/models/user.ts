import Sequelize from 'sequelize';
import sequelize from './database';
const User:any = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    lastName: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    password: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    code: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});
export default User;
