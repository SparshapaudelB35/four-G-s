const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db.js");

const Tour = sequelize.define("tour", {
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
    allowNull: true, // Allow null in case the price is computed later
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

module.exports = Tour;
