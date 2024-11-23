import express from "express";
import ProductController from "../controller/ProductController";
import EntityProduct from "../entity/EntityProduct";
const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await ProductController.getObjects();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.get("/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductController.getObjectById(id);
        res.send(product);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
})

router.post("/product", async (req, res) => {
    try {
        const data = req.body;
        const product: EntityProduct = {
            _id: data.id,
            name: data.name,
            type: data.type,
            price: data.price,
            rating: data.rating,
            warranty_years: data.warranty_years,
            available: data.available,
        }
        await ProductController.addObject(product);
        res.send(product);
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
})

router.delete("/product/:id", async (req, res) => {
    try {
        const data = req.params;
        ProductController.deleteObjectById(data.id);
        res.send(`Le produit ${data.id} a bien été supprimé !`);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.patch("/product/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const product: EntityProduct = {
            _id: id,
            name: data.name,
            type: data.type,
            price: data.price,
            rating: data.rating,
            warranty_years: data.warranty_years,
            available: data.available,
        }
        ProductController.updateObject(product);
        res.send(product);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});


export default router;