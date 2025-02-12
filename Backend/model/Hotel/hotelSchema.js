import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Hotel = sequelize.define("hotel", {
  bookingId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, 
    autoIncrement: true, 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hotelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
});

(async () => {
  try {
    await Hotel.sync();
    console.log("The Hotel table has been created or updated");
  } catch (error) {
    console.error("Error syncing the Hotel model:", error.message);
  }
})();


