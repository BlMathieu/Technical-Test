import { Schema } from "mongoose";
import AbstractModel from "./AbstractModel";
class ModelProduct extends AbstractModel {
    constructor() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: false,
            },
            price: {
                type: Number,
                required: false,
            },
            rating: {
                type: Number,
                required: false,
            },
            warranty_years: {
                type: Number,
                required: false,
            },
            available: {
                type: Boolean,
                required: false,
            }
        })
        super("Product", schema);
    }
}

export default ModelProduct;