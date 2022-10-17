import { Router } from "express";
import isAdmin from "../middlewares/admin.js";
import ProductsContainer from "../containers/productsContainer.js";

const productsContainer = new ProductsContainer('productos.json');

const router = Router();

router.get('/:id?', async (req, res) => {
    const { id } = req.params;

    if (typeof (id) === "string") {
        const product = await productsContainer.getById(id);

        if (product === false) { // error if product doesn't exist
            res.sendStatus(400);
            return
        }

        res.status(302).json(product);
        return
    }

    res.json(await productsContainer.getAll());
});

router.post('/', isAdmin, async (req, res) => {
    await productsContainer.save(req.body);

    res.sendStatus(201);
});

router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const changeProduct = await productsContainer.change(id, req.body);

    if (changeProduct === false) {
        res.sendStatus(400);
        return
    }
    
    res.sendStatus(202);
});

router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await productsContainer.deleteById(id);
    if (deleteProduct === false) {
        res.sendStatus(400);
        return
    }

    res.sendStatus(202);
});

export default router