import express from 'express';
import { tourController } from '../../controller/index.js';

const router = express.Router();

router.get('/', tourController.getAllTours); 
router.post('/save',tourController.saveAllTour); 
router.post('/', tourController.createTour); 
router.put('/:tourId',tourController.updateTour); 
router.delete('/:tourId',tourController.deleteTourById); 
router.get('/:tourId',tourController.getTourById); 

export { router as tourRouter };
