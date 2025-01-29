import express from 'express';
import {
  getAllCustomer,
  saveAllCustomer,
  create,
  update,
  deleteById,
  getById
} from '../../controller/User/userController.js';

const router = express.Router();

router.get('/users', getAllCustomer); 
router.post('/users', saveAllCustomer); 
router.post('/', create); 
router.put('/:id', update); 
router.delete('/:id', deleteById); 
router.get('/:id', getById); 

export default router;
