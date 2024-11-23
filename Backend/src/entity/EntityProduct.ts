import Entity from "./Entity";

interface EntityProduct extends Entity{
    name:string,
    type:string,
    price:number,
    rating:number,
    warranty_years:number,
    available:boolean,
}

export default EntityProduct;
