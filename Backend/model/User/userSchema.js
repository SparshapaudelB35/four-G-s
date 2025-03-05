import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Users = sequelize.define("users", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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


