import Sequelize from 'sequelize';
const database = new Sequelize.Sequelize('graphdatabase', // name database
'root', // user database
'12345678', // password database
{
    dialect: 'mysql' // mariadb / sqlite / postgres
});
database.sync();
export default database;
