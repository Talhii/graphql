import Sequelize from 'sequelize';
import sequelize from './database';
import User from './user';
const Post:any = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    userId: {
        type: Sequelize.INTEGER,
        defaultValue: ""
    },
});

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

export default Post;
