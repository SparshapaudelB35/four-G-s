import express from 'express';
import { tourController } from '../../controller/index.js';

const router = express.Router();

router.get('/', tourController.getAllTours); 
router.post('/save', tourController.saveAllTour); 
router.post('/', tourController.createTour); 
router.put('/:id', tourController.updateTour); 
router.delete('/:id', tourController.deleteTourById); 
router.get('/:id', tourController.getTourById); 

export {router as tourRouter};
