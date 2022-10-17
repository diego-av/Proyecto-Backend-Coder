import { Router } from "express";
import CartContainer from "../containers/cartContainer.js";

const router = Router();

const cartContainer = new CartContainer('cart.json');

router.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const products = await cartContainer.getAllItems(id);

    res.status(202).json(products);
});

router.post('/', async (req, res) => {
    const id = await cartContainer.create();

    res.status(201).json(id);
});

router.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const { prodId } = req.body
    await cartContainer.saveItem(id, prodId);

    res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleteCart = await cartContainer.deleteById(id);
    if (deleteCart === false) {
        res.sendStatus(400);
        return
    }

    res.sendStatus(202);
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const deleteItem = await cartContainer.deleteItem(id, id_prod);

    if (deleteItem === false) {
        res.sendStatus(400);
        return
    }

    res.sendStatus(202);
});

export default router