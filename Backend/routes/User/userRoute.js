import express from 'express';
import { userController } from '../../controller/index.js';

const router = express.Router();

router.get('/', userController.getAllCustomer); 
router.post('/', userController.saveAllCustomer); 
router.post('/', userController.create); 
router.put('/:id', userController.update); 
router.delete('/:id', userController.deleteById); 
router.get('/:id', userController.getById); 

export {router as userRouter};
