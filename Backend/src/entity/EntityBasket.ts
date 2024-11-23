import Entity from "./Entity";

interface EntityBasket extends Entity{
    product_id:string,
    product_name:string,
    product_price:number,
    user_id:string,
    amount:number,
}
export default EntityBasket;