import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

export const HotelBooking = sequelize.define("hotelBooking", {
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
  isTripAlreadyBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

(async () => {
  try {
    await HotelBooking.sync();
    console.log("The HotelBooking table has been created or updated");
  } catch (error) {
    console.error("Error syncing the HotelBooking model:", error.message);
  }
})();


