import { Model } from "mongoose";
import AbstractModel from "../model/AbstractModel";
import Entity from "../entity/Entity";

abstract class AbstractController {
    protected model: Model<any>;
    constructor(model: AbstractModel) {
        this.model = model.getModel();
    }

    public async getObjects(): Promise<Entity[]> {
        const objects: any = await this.model.find({});
        return objects;
    }

    public async getObjectById(id: string): Promise<Entity> {
        const object: any = await this.model.findOne({ _id: id });
        return object;
    }

    public async deleteObjectById(id: string): Promise<void> {
        const object = await this.model.findOne({ _id: id });
        if (object != null && object.amount > 1) {
            await this.model.updateOne({ _id: id }, { amount: object.amount - 1 });
        } else {
            await this.model.deleteOne({ _id: id });
        }
    }

    public async addObject(object: Entity): Promise<void> {
        await this.model.create(object);
    }

    public updateObject(_object: Entity) {
        throw new Error("Cannot be executed !");
    }
}

export default AbstractController;