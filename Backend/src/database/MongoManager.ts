import mongoose, { Model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class MongoManager {
    constructor(){
        const url = (process.env.DATABASE_URL != null) ? process.env.DATABASE_URL:""
        mongoose.connect(url);
    }

    public createModel(name:string, schema:mongoose.Schema):Model<any>{
        return mongoose.model(name,schema);
    }
}


export default new MongoManager();