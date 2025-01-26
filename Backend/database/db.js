const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("postgres","postgres","saranghae",{
    host : "localhost",
    dialect : "postgres",
});

const connection = async () => {
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }catch(error){
        console.error("Unable to connect to the database",error);
        console.error("Error details:", error.message); 
    }
};

module.exports = { sequelize, connection };