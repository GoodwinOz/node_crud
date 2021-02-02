module.exports = {
    HOST: 'localhost',
    USER: 'main',
    PASSWORD: 'qwerty123',
    DB: 'users',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 15000,
        idle: 8000 
    }
}