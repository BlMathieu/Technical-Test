import ModelProduct from "../model/ModelProduct";
import EntityProduct from "../entity/EntityProduct";
import AbstractController from "./AbstractController";

class ProductController extends AbstractController {
    constructor() {
        super(new ModelProduct());
    }
    public async updateObject(product: EntityProduct): Promise<void> {
        await this.model.updateOne({ _id: product._id }, { name: product.name, type: product.type, price: product.price, rating: product.rating, warranty_years: product.warranty_years, available: product.available })
    }
}

export default new ProductController();