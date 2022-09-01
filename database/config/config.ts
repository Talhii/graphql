require("dotenv");

export default {
  "development": {
    "username": "root",
    "password": "12345678",
    "database": "graphbase",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "12345678",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "12345678",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
