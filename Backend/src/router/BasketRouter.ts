import express from "express";
import BasketController from "../controller/BasketController";
import EntityBasket from "../entity/EntityBasket";
import AuthenticationMiddleware from "../middleware/AuthenticationMiddleware";
const router = express.Router();

router.get("/baskets", AuthenticationMiddleware, async (req, res) => {
    try {
        const access_token = (req.headers.authorization != null) ? req.headers.authorization.replace("Bearer ", "") : "";
        const basket = await BasketController.getUserBasket(access_token);
        res.send(basket);
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
});

router.get("/basket/:id", AuthenticationMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const basket = await BasketController.getObjectById(id);
        res.send(basket);
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
});

router.post("/basket", AuthenticationMiddleware, async (req, res) => {
    try {
        const data = req.body;
        const basket: EntityBasket = {
            product_id: data.product_id,
            product_name: data.product_name,
            product_price: data.product_price,
            user_id: data.user_id,
            amount: data.amount,
        }
        await BasketController.addObject(basket);
        res.send(basket);
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
});

router.delete("/basket/:id", AuthenticationMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        await BasketController.deleteObjectById(id);
        res.send({message: `${id} supprimé !`});
    }catch(error){
        console.error(error);
        res.send({message: error});
    }
})

router.patch("/basket/amount/:id/:amount", AuthenticationMiddleware, async (req, res) => {
    try {
        const data = req.body;
        BasketController.updateBasketAmountById(data._id, data.amount);
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
})


export default router;