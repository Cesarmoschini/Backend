import { Router } from 'express';
import { cartController } from '../controllers/cart';
const router = Router();

router.get('/', async (req, res) => {
  const cart = await cartController.getAll();
  res.json({
    data: cart,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const cart = await cartController.getById(id);

  if (!cart)
    return res.status(404).json({
      msg: 'Cart not found',
    });

  res.json({
    data: cart,
  });
});

router.post('/', async (req, res) => {
  if (!Config.administrator)
  return res.status(401).json({
    msg:"Desautorizado"
  })
  console.log(req.body);
  const { productId, amount } = req.body;

  const newCart = {
    productId,
    amount,
  };

  const result = await cartController.save(newCart);

  socketEmit('cart', result);

  res.json({ msg: newCart });
});

router.put('/:id', async (req, res) => {

  const {  productId, amount  } = req.body;
  const { id } = req.params;

  const cart = await cartController.getById(id);

  if (!cart)
    return res.status(404).json({
      msg: 'Cart not found',
    });

  if (!productId || !amount)
    return res.status(400).json({
      msg: 'Need productId and amount in Body',
    });

  const newCart = {
    productId,
    amount,
  };

  const result = await cartController.Update(id, newCart);

  res.json({
    data: result,
  });
});

router.delete('/:id', async (req, res) => {

  const { id } = req.params;
  await cartController.deleteById(id);
  res.json({
    msg: 'Ok',
  });
});

export default router;