import express from 'express';
import {
  getAllTours,
  saveAllTour,
  createTour,
  updateTour,
  deleteTourById,
  getTourById
} from '../../controller/Tour/tourController.js';

const router = express.Router();

router.get('/tours', getAllTours); 
router.post('/tours', saveAllTour); 
router.post('/', createTour); 
router.put('/:id', updateTour); 
router.delete('/:id', deleteTourById); 
router.get('/:id', getTourById); 

export default router;
