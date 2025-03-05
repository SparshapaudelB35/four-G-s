import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const Tour = sequelize.define("tour", {
  tourId:{
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
  numberOfPassengers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  destination: {
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
    allowNull: false, 
  },
});

(async () => {
  try {
    await Tour.sync();
    console.log("The Tour table has been created or updated");
  } catch (error) {
    console.error("Error syncing the Tour model:", error.message);
  }
})();


