const { DataTypes, Model } = require("sequelize"); // Corrected typo here
const { sequelize } = require("../database/db");

const Users = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true, 
    },
    email : {
        type: DataTypes.STRING,
        allowNull:false,
    },
    password :{
        type: DataTypes.STRING,
        allowNull:false,
    }
});

(async () => {
    try {
        await Users.sync();
        console.log("The Users table has been created or updated");
    } catch (error) {
        console.error("Error syncing the Users model:", error.message);
    }
})();

module.exports = Users;