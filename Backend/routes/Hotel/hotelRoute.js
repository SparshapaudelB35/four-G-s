import express from 'express';
import { hotelController } from '../../controller/index.js';

const router = express.Router();

router.get('/', hotelController.getAllHotelBookings); 
router.post('/save', hotelController.saveAllHotelBooking); 
router.post('/', hotelController.createHotelBooking); 
router.put('/:bookingId', hotelController.updateHotelBooking); 
router.delete('/:bookingId', hotelController.deleteHotelBookingById); 
router.get('/:bookingId', hotelController.getHotelBookingById); 

export {router as hotelRouter};
