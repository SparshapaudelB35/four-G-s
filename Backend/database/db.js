const { Sequelize, Sequelize } = require("sequelize")

const Sequelize = new Sequelize("postgres","postgres","postgres",{
    host : "localhost",
    dialect : "postgres",
});

const connection = async () => {
    try{
        await Sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }catch(error){
        console.error("Unable to connect to the database",error);
    }
};

module.exports = { sequelize, connection };