import { Router } from 'express';
import productsRouter from './products';
import categoriesRouter from './category';
import cartsRouter from './cart';

const router = Router();

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/carts', cartsRouter);

export default router;