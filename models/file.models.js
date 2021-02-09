module.exports = (sequelize, DataTypes) => {
    const Upload = sequelize.define('upload', {
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        }
    })
    
    return Upload
}