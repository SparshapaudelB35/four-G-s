const {Datatypes} = require("sequelize");
const {sequelize} = require("../database/db");

const Users = sequelize.define("users",{
    name : {
        type: Datatypes.STRING,
        allowNull : false,
    },
    userId:{
        type: Datatypes.INTEGER,
        allowNull : false,
    },
});
(async () => {
    try{
        await Users.sync(); //creates or updates the table based 
        console.log("The Users table has been created or updated");
    }catch (error) {
        console.error("Error syncing the Users model:",error.message);
    } 
});