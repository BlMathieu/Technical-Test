import { Model, Schema } from "mongoose";
import MongoManager from "../database/MongoManager";

abstract class AbstractModel{
    private model:Model<any>;
    constructor(modelName:string,schema:Schema){
        this.model = MongoManager.createModel(modelName,schema)
    }

    public getModel(){
        return this.model;
    }
} 

export default AbstractModel;