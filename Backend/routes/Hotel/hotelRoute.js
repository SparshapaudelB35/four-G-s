import express from 'express';
import { hotelController } from '../../controller/index.js'

const router = express.Router();

router.get('/hotels', hotelController.getAllHotelBookings); 
router.post('/hotels', hotelController.saveAllHotelBooking); 
router.post('/', hotelController.createHotelBooking); 
router.put('/:id', hotelController.updateHotelBooking); 
router.delete('/:id', hotelController.deleteHotelBookingById); 
router.get('/:id', hotelController.getHotelBookingById); 

export {router as hotelRouter};
