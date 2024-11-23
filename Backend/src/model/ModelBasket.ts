import { Schema } from "mongoose";
import AbstractModel from "./AbstractModel";

class ModelBasket extends AbstractModel{
    constructor(){
        const schema = new Schema({
            user_id:{
                type: Schema.Types.ObjectId,
                ref: 'UserAccount',
                required: true,
            },
            product_id:{
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            product_name:{
                type: String,
                required: true,
            },
            product_price:{
                type: Number,
                required:true,
            },
            amount:{
                type:Number,
                required: true,
                min: 1,
            },
        });
        super("Basket",schema);
    }
}
export default ModelBasket;