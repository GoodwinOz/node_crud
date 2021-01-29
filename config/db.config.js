module.exports = {
    HOST: 'localhost',
    USER: 'your_usermane',
    PASSWORD: 'your_pass',
    DB: 'your_db_name',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 15000,
        idle: 8000 
    }
}