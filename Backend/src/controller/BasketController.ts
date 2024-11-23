import EntityBasket from "../entity/EntityBasket";
import EntityUserAccount from "../entity/EntityUserAccount";
import JWTAuthentifier from "../jwt/JWTAuthentifier";
import ModelBasket from "../model/ModelBasket";
import AbstractController from "./AbstractController";
class BasketController extends AbstractController {

    constructor() {
        super(new ModelBasket());
    }

    public async addObject(object: EntityBasket): Promise<void> {
        const dbObject: any = await this.model.findOne({ user_id: object.user_id, product_id: object.product_id });
        if (dbObject != null) {
            await this.model.updateOne({ _id: dbObject._id }, { amount: Number(dbObject.amount) + 1 });
        } else {
            await this.model.create(object);
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