import EntityBasket from "../entity/EntityBasket";
import EntityProduct from "../entity/EntityProduct";
import EntityUserAccount from "../entity/EntityUserAccount";
import APIError from "../error/APIError";
import JWTAuthentifier from "../jwt/JWTAuthentifier";
import ModelBasket from "../model/ModelBasket";
import AbstractController from "./AbstractController";
import ProductController from "./ProductController";

class BasketController extends AbstractController {

    constructor() {
        super(new ModelBasket());
    }

    public async addObject(object: EntityBasket): Promise<void> {
        const dbBasketObject: any = await this.model.findOne({ user_id: object.user_id, product_id: object.product_id });
        const dbProduct: any = await ProductController.getObjectById(object.product_id);
        if (dbProduct != null && dbProduct.available) {
            if (dbBasketObject != null) {
                await this.model.updateOne({ _id: dbBasketObject._id }, { product_name: object.product_name, product_price: object.product_price, amount: Number(dbBasketObject.amount) + 1 });
            } else {
                await this.model.create(object);
            }
        } else {
            throw new APIError("Le produit n'est pas disponible !");
        }
    }

    public async getUserBasket(access_token: string): Promise<EntityBasket[]> {
        const dbUser: EntityUserAccount = JWTAuthentifier.getUserFromAccessToken(access_token);
        const baskets = await this.model.find({});
        const userBasket = baskets.filter((basket: EntityBasket) => basket.user_id == dbUser._id);
        return userBasket;
    }

    public async updateBasketAmountById(id: string, amount: number): Promise<void> {
        await this.model.updateOne({ _id: id }, { amount: amount });
    }
}

export default new BasketController();