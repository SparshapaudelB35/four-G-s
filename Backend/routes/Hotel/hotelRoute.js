import express from 'express';
import {
  getAllHotelBookings,
  saveAllHotelBooking,
  createHotelBooking,
  updateHotelBooking,
  deleteHotelBookingById,
  getHotelBookingById
} from '../../controller/Hotel/hotelController.js';

const router = express.Router();

router.get('/hotels', getAllHotelBookings); 
router.post('/hotels', saveAllHotelBooking); 
router.post('/', createHotelBooking); 
router.put('/:id', updateHotelBooking); 
router.delete('/:id', deleteHotelBookingById); 
router.get('/:id', getHotelBookingById); 

export default router;
