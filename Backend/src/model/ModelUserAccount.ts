import { Schema } from "mongoose";
import AbstractModel from "./AbstractModel";

class ModelUserAccount extends AbstractModel {
    constructor() {
        const schema = new Schema({
            login: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            refresh_token: {
                type: String,
                required: false,
            },
        })
        super("UserAccount", schema);
    }
}
export default ModelUserAccount;